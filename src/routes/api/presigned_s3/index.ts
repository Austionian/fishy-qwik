import type { RequestHandler } from "@builder.io/qwik-city";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

  const client = new S3Client({ region, credentials });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  const presignedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  json(200, { presignedUrl });
};
