import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getUserDetials } from "~/helpers";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";
import type Recipe from "~/types/Recipe";
import type UserDetails from "~/types/UserDetails";

import FishDetailsPage from "~/components/fish-details-page/fish-details-page";

type FishData = {
  fish_data: Fish;
  recipe_data: Recipe[];
};

export const useFishData = routeLoader$<FishData>(async ({ env, params }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/fish_avg?fishtype_id=${params.fishId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return await res.json();
});

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetials(cookie);
});

export default component$(() => {
  const fishData = useFishData();
  const userDetails = useUserDetails();

  return (
    <FishDetailsPage
      fishData={fishData.value}
      userDetails={userDetails.value}
    />
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const fish = resolveValue(useFishData);
  return {
    title: fish.fish_data.anishinaabe_name,
    meta: [
      {
        name: "description",
        content: `Learn the nutritional details of a ${fish.fish_data.name}`,
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};