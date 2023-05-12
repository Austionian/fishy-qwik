import type { RequestHandler } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";
import { getAPIKey } from "~/helpers";

export const onPost: RequestHandler<Fish[]> = async ({
  env,
  json,
  request,
}) => {
  const apiKey = getAPIKey(env);
  const requestBody = await request.json();
  const name = requestBody.fileName;
  console.log(name);

  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/presign_s3`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }
  );
  const data = await res.json();
  json(200, data);
};
