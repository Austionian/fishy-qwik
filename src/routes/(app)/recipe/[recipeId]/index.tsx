import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";
import type Recipe from "~/types/Recipe";

import Error from "~/components/error/error";
import NavBack from "~/components/nav-back/nav-back";
import FavoriteButton from "~/components/favorite-button/favorite-button";
import getCookieForFetch from "~/helpers/getCookieForFetch";

type RecipeLoader = {
  data: Recipe;
  is_favorite: boolean;
  errorMessage: string;
};

export const useRecipeData = routeLoader$<RecipeLoader>(
  async ({ env, params, cookie, fail }) => {
    const { apiKey, domain } = getFetchDetails(env);
    const res = await fetch(`${domain}/v1/recipe/${params.recipeId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        cookie: getCookieForFetch(cookie),
      },
    });
    try {
      return await res.json();
    } catch {
      return fail(404, {
        errorMessage: "Recipe not found.",
      });
    }
  },
);

export default component$(() => {
  const recipeData = useRecipeData();
  const favorite = useSignal(recipeData.value.is_favorite);
  const randomNumber = useSignal(Math.floor(Math.random() * 5) + 1);

  if (recipeData.value.errorMessage) {
    return <Error message={recipeData.value.errorMessage} />;
  }

  return (
    <div class="min-h-full">
      <main class="pb-10">
        <NavBack href={"/recipe"} text={"recipes"} />
        <div class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 mb-10">
          <div class="flex justify-center items-center flex-wrap space-x-5">
            <div class="relative my-2">
              <img
                src={
                  recipeData.value.data.image_url
                    ? recipeData.value.data.image_url
                    : `/images/dish${randomNumber.value}.webp`
                }
                alt={"Stock fish dish image"}
                class="h-[300px] sm:h-56 w-[90vw] object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div class="mx-auto max-w-3xl px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-5 lg:max-w-7xl lg:px-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {recipeData.value.data.name}
            </h1>
          </div>
          <FavoriteButton
            favorite={favorite}
            type={"recipe"}
            id={recipeData.value.data.id}
          />
        </div>
        <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-6 sm:px-6 lg:max-w-full">
          <div class="space-y-6 w-full sm:col-span-1">
            <div class="bg-white dark:bg-gray-900/80 shadow sm:rounded-lg dark:ring-1 dark:ring-white/10">
              <div class="px-4 py-5 sm:px-6">
                <h2
                  id="ingredients-list"
                  class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Ingredients
                </h2>
              </div>
              <div class="px-5 pb-2">
                {recipeData.value.data.ingredients.map((ingredient, i) => (
                  <div class="space-y-5" key={i}>
                    <div class="relative flex items-start">
                      <div class="ml-1 text-sm leading-6">
                        <p class="font-light text-gray-900 dark:text-gray-300">
                          {ingredient}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="space-y-6 w-full sm:col-span-2">
            <div class="bg-white dark:bg-gray-900/80 shadow sm:rounded-lg dark:ring-1 dark:ring-white/10">
              <div class="px-4 py-5 sm:px-6">
                <h2
                  id="ingredients-list"
                  class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Preparation
                </h2>
              </div>
              <div>
                <div class="relative">
                  <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  ></div>
                </div>
                <div class="px-6 pb-2">
                  {recipeData.value.data.steps.map((step, i) => (
                    <div class="space-y-5 mb-5" key={i}>
                      <div class="font-light leading-6">
                        <p class="text-sm text-gray-900 dark:text-gray-300">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const recipe = resolveValue(useRecipeData);
  return {
    title: recipe?.data?.name || "404",
    meta: [
      {
        name: "description",
        content: `Learn the ingredients of and how to cook ${recipe?.data?.name}`,
      },
      {
        name: "id",
        content: params.recipeId,
      },
    ],
  };
};
