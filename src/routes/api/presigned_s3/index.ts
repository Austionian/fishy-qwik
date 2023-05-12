import type { RequestHandler } from "@builder.io/qwik-city";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import type Fish from "~/types/Fish";
import { getEnvKey } from "~/helpers";

export const onPost: RequestHandler<Fish[]> = async ({
  env,
  json,
  request,
}) => {
  const region = getEnvKey(env, "S3_REGION");
  const bucket = getEnvKey(env, "BUCKET");
  const credentials = {
    accessKeyId: getEnvKey(env, "ACCESS_KEY_ID"),
    secretAccessKey: getEnvKey(env, "SECRET_ACCESS_KEY"),
  };

  const requestBody = await request.json();
  const key = requestBody.fileName;

  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials,
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(
    new HttpRequest({ ...url, method: "PUT" })
  );

  const presignedUrl = formatUrl(signedUrlObject);
  json(200, { presignedUrl });
};
