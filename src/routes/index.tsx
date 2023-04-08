import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getAPIKey } from "~/helpers";
import type Fish from "~/types/Fish";
import FishList from "~/components/fish-list/fish-list";
import InfoModal from "~/components/info-modal/infoModal";

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
  const data = await res.json();
  return data.map((fish: Fish) => ({
    id: fish.id,
    fish_id: fish.fish_id,
    name: fish.name,
    anishinaabe_name: fish.anishinaabe_name || "",
    fish_image: fish.fish_image,
  }));
});

export const useUserDetails = routeLoader$<boolean>(async ({ cookie }) => {
  if (!cookie.get("user-details")) {
    return true;
  }
  return false;
});

export default component$(() => {
  const userDetailsCookie = useUserDetails();
  const fishData = useFishData();
  const showUserInputModal = useSignal(userDetailsCookie.value);

  return (
    <div>
      {showUserInputModal.value && (
        <InfoModal showUserInputModal={showUserInputModal} />
      )}
      <FishList fishData={fishData} />
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
