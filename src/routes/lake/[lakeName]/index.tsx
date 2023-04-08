import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import FishList from "~/components/fish-list/fish-list";
import { getAPIKey } from "~/helpers";
import type Fish from "~/types/Fish";

export const useFishData = routeLoader$<Fish[]>(async ({ env, params }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs?lake=${params.lakeName}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  return data.map((fish: Fish) => ({
    id: fish.id,
    fish_id: fish.fish_id,
    name: fish.name,
    anishinaabe_name: fish.anishinaabe_name || "",
    fish_image: fish.fish_image,
  }));
});

export default component$(() => {
  const fishData = useFishData();

  return <FishList fishData={fishData} />;
});

export const head: DocumentHead = {
  title: "Gigiigoo App",
  meta: [
    {
      name: "description",
      content:
        "Learn healthy, personalized fish portions and nutritional contents",
    },
  ],
};
