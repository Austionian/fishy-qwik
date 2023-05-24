import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getUserDetails, getFetchDetails } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

import FishList from "~/components/fish-list/fish-list";
import LakeValues from "~/types/LakeValues";
import LAKE_VALUES from "~/constants/lakes";

export const useFishData = routeLoader$<Fish[]>(async ({ env, query }) => {
  const { apiKey, domain } = getFetchDetails(env);
  let filter = query.get("lake") as LakeValues;
  if (!LAKE_VALUES.includes(filter)) {
    filter = "All";
  }
  let res;
  if (filter && filter !== "All") {
    res = await fetch(`${domain}/v1/fishs?lake=${filter}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  } else {
    res = await fetch(`${domain}/v1/fish_avgs`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }
  return await res.json();
});

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetails(cookie);
});

export const useFishFilter = routeLoader$<string>(async ({ query }) => {
  let filter = (query.get("lake") as LakeValues) || "All";
  if (!LAKE_VALUES.includes(filter)) {
    filter = "All";
  }
  return filter;
});

export default component$(() => {
  const userDetails = useUserDetails();
  const fishFilter = useFishFilter().value as LakeValues;
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
    window.localStorage.setItem(fishFilter, JSON.stringify(fishData.value));
  });

  return (
    <FishList
      fishData={fishStore}
      userDetails={userDetailsStore}
      fishFilter={fishFilter}
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
