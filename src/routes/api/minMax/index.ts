import type { RequestHandler } from "@builder.io/qwik-city";
import { getAPIKey } from "~/helpers";

type Fish = {
  name: string;
  anishinaabe_name: string;
  value: number;
};

export const onGet: RequestHandler<Fish[]> = async ({ env, json, query }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/min_and_max?attr=${query.get(
      "attr"
    )}&lake=${query.get("lake")}&avg=false`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  json(200, data);
};
