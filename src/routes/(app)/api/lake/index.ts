import type { RequestHandler } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";
import { getFetchDetails } from "~/helpers";

export const onGet: RequestHandler<Fish[]> = async ({ env, query, json }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/fishs?lake=${query.get("lakeName")}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await res.json();
  json(200, data);
};
