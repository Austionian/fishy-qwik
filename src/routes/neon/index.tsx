import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

export const useApiKey = routeLoader$(async ({ env }) => {
  return getAPIKey(env);
});

export default component$(() => {
  const apiKey = useApiKey();
  const fishResource = useResource$<Fish[]>(async () => {
    const res = await fetch(
      "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
      {
        headers: {
          Authorization: `Bearer ${apiKey.value}`,
        },
      }
    );
    return res.json();
  });

  return (
    <div>
      <h1 class="text-black">Hello</h1>
      <ul>
        <Resource
          value={fishResource}
          onPending={() => <div>Loading...</div>}
          onResolved={(data) => {
            return (
              <ul>
                {data.map((fish, i) => (
                  <li key={i}>{fish.name}</li>
                ))}
              </ul>
            );
          }}
          onRejected={() => (
            <div>Failed to load fish data. Please refresh your page.</div>
          )}
        />
      </ul>
    </div>
  );
});
