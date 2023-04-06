import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

export const useFishApi = routeLoader$<Fish[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return res.json();
});

export default component$(() => {
  const fishData = useFishApi();
  return (
    <div>
      <h1 class="text-black">Hello</h1>
      <ul>
        {fishData.value.map((fish, i) => (
          <li key={i}>{fish.name}</li>
        ))}
      </ul>
    </div>
  );
});
