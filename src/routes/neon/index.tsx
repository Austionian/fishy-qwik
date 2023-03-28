import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";

interface Fish {
  name: string;
}

export const useNeonData = routeLoader$<Fish[]>(async ({ env }) => {
  const token = getAPIKey(env);

  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
});

export default component$(() => {
  const fishData = useNeonData();

  return (
    <div>
      <ul>
        <ul>
          {fishData &&
            fishData.value.map((fish, i) => <li key={i}>{fish.name}</li>)}
        </ul>
      </ul>
    </div>
  );
});
