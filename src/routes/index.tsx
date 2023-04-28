import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getAPIKey, getUserDetials } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

import FishList from "~/components/fish-list/fish-list";

export const useFishData = routeLoader$<Fish[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fish_avgs",
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
  const userDetailsStore = useStore({
    data: userDetails.value || {
      needed: true,
      age: undefined,
      weight: undefined,
      sex: undefined,
      plan_to_get_pregnant: undefined,
      portion: undefined,
    },
  });
  const fishData = useFishData();
  const fishStore = useStore({
    data: fishData.value,
  });

  useVisibleTask$(async () => {
    window.localStorage.setItem("All", JSON.stringify(fishData.value));
  });

  return (
    <FishList
      fishData={fishStore}
      userDetails={userDetailsStore}
      location={"/"}
    />
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
