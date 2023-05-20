import type { RequestHandler } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";
import { getFetchDetails } from "~/helpers";

export const onPost: RequestHandler<Fish[]> = async ({
  env,
  json,
  request,
}) => {
  const { apiKey, domain } = getFetchDetails(env);
  const requestBody = await request.json();
  const name = requestBody.fileName;

  const res = await fetch(`${domain}/v1/presign_s3`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
  const data = await res.json();
  json(200, data);
};
