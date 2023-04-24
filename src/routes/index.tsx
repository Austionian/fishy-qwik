import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getAPIKey, getUserDetials } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

import FishList from "~/components/fish-list/fish-list";

export const useFishData = routeLoader$<Fish[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs?lake=Store",
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
  const userDetails = useUserDetails();
  const fishData = useFishData();

  return (
    <div>
      <FishList fishData={fishData.value} userDetails={userDetails.value} />
    </div>
  );
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
