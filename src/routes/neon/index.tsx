import { component$, Resource, useResource$ } from "@builder.io/qwik";
// import { routeLoader$ } from "@builder.io/qwik-city";
// import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

// export const useFishApi = routeLoader$<Fish[]>(async ({ env }) => {
//   const apiKey = getAPIKey(env);
//   const res = await fetch(
//     "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
//     {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//     }
//   );
//   return res.json();
// });

export const getFish = async () => {
  const res = await fetch("/api/fish");
  const data = await res.json();
  return data;
};

export default component$(() => {
  // const fishData = useFishApi();
  const fishResource = useResource$<Fish[]>(async () => {
    return await getFish();
  });
  return (
    <div>
      <h1 class="text-black">Hello</h1>
      <ul>
        <Resource
          value={fishResource}
          onPending={() => <div>Loading...</div>}
          onResolved={(fishs) => (
            <>
              {fishs.map((fish, i) => (
                <li key={i}>{fish.name}</li>
              ))}
            </>
          )}
        />
      </ul>
    </div>
  );
});
