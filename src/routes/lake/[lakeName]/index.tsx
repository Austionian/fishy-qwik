import { component$, useStore } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import FishList from "~/components/fish-list/fish-list";
import { getAPIKey, getUserDetials } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

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
  return await res.json();
});

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetials(cookie);
});

export default component$(() => {
  const fishData = useFishData();
  const userDetails = useUserDetails();
  const userDetailsStore = useStore({
    data: userDetails.value,
  });
  const location = useLocation();

  return (
    <FishList
      fishData={fishData.value}
      userDetails={userDetailsStore}
      location={location.url.pathname.split("/")[2]}
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
