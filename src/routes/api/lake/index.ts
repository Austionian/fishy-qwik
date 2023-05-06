import type { RequestHandler } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";
import { getAPIKey } from "~/helpers";

export const onGet: RequestHandler<Fish[]> = async ({ env, query, json }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs?lake=${query.get(
      "lakeName"
    )}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  json(200, data);
};
