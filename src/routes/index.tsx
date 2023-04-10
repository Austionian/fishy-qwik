import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getAPIKey } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

import FishList from "~/components/fish-list/fish-list";
import InfoModal from "~/components/info-modal/info-modal";

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
  if (!cookie.get("user-details")) {
    return {
      needed: true,
      weight: undefined,
      age: undefined,
      portion: undefined,
    };
  }
  return {
    needed: false,
    weight: cookie.get("weight")?.value,
    age: cookie.get("age")?.value,
    portion: cookie.get("portion")?.value,
  };
});

export default component$(() => {
  const userDetails = useUserDetails();
  const fishData = useFishData();
  const showUserInputModal = useSignal(userDetails.value.needed);

  return (
    <div>
      {showUserInputModal.value && (
        <InfoModal showUserInputModal={showUserInputModal} />
      )}
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
