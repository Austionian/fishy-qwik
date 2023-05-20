import type { RequestHandler } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

type Fish = {
  name: string;
  anishinaabe_name: string;
  value: number;
};

export const onGet: RequestHandler<Fish[]> = async ({ env, json, query }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const attr = query.get("attr");
  const lake = query.get("lake");
  const res = await fetch(
    `${domain}/v1/min_and_max?attr=${attr}${lake ? `&lake=${lake}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  json(200, data);
};
