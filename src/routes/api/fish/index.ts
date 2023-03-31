import type { RequestHandler } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

export const onGet: RequestHandler<Fish[]> = async ({ json, env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data: Fish[] = await res.json();
  json(200, {
    data,
  });
};
