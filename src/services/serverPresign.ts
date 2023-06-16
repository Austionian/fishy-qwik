import { server$ } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

// Gets a presigned url to upload an image to s3 from the client.
export const serverHandleUpload = server$(async function (name: string) {
  const { apiKey, domain } = getFetchDetails(this.env);
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
  return await res.json();
});
