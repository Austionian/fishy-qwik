import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getUserDetails, getFetchDetails } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";
import type LakeValues from "~/types/LakeValues";
import LAKE_VALUES from "~/constants/lakes";

import FishList from "~/components/fish-list/fish-list";
import Error from "~/components/error/error";

type ErrorType = {
  errorMessage?: string;
};

export const useFishData = routeLoader$<Fish[] & ErrorType>(
  async ({ env, query, fail }) => {
    const { apiKey, domain } = getFetchDetails(env);
    let filter = (query.get("lake") as LakeValues) || "All";
    if (!LAKE_VALUES.includes(filter)) {
      filter = "All";
    }
    let res;
    if (filter !== "All") {
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
    try {
      return await res.json();
    } catch {
      return fail(500, {
        errorMessage: "Unable to complete current request.",
      });
    }
  }
);

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
    data: userDetails.value,
  });
  const fishData = useFishData();

  if (fishData.value.errorMessage) {
    return <Error message={fishData.value.errorMessage} />;
  }
  const fish = useStore({
    data: fishData.value,
  });

  return (
    <FishList
      fishData={fish}
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
