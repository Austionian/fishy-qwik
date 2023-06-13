import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getUserDetails, getFetchDetails } from "~/helpers";
import type Fish from "~/types/Fish";
import type Recipe from "~/types/Recipe";
import type UserDetails from "~/types/UserDetails";

import FishDetailsPage from "~/components/fish-details-page/fish-details-page";
import Error from "~/components/error/error";

type FishData = {
  fish_data: Fish;
  recipe_data: Recipe[];
  is_favorite: boolean;
  errorMessage?: string;
};

export const useFishData = routeLoader$<FishData>(
  async ({ env, params, cookie, fail }) => {
    const { apiKey, domain } = getFetchDetails(env);
    const res = await fetch(
      `${domain}/v1/fish_avg?fishtype_id=${params.fishId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          cookie: `user_id=${cookie.get("user_id")?.value}`,
        },
      }
    );
    try {
      return await res.json();
    } catch {
      return fail(404, {
        errorMessage: "Fish not found.",
      });
    }
  }
);

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetails(cookie);
});

export default component$(() => {
  const fishData = useFishData();
  const userDetails = useUserDetails();

  if (fishData.value.errorMessage) {
    return <Error message={fishData.value.errorMessage} />;
  }

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
    title: fish?.fish_data?.anishinaabe_name || fish?.fish_data?.name || "404",
    meta: [
      {
        name: "description",
        content: `Learn the nutritional details of a ${fish?.fish_data?.name}`,
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};
