import { component$, Resource, useResource$ } from "@builder.io/qwik";
import getAPIKey from "~/helpers/getAPIKey";

interface Fish {
  name: string;
}

export default component$(() => {
  const token = getAPIKey();
  const fishResource = useResource$<Fish[]>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(
      "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal,
      }
    );
    return res.json();
  });

  return (
    <div>
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
        />
      </ul>
    </div>
  );
});
