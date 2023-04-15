import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { classNames, getAPIKey } from "~/helpers";
import type Recipe from "~/types/Recipe";

export const useRecipeData = routeLoader$<Recipe[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/recipe/",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return await res.json();
});

export default component$(() => {
  const recipeData = useRecipeData();
  return (
    <div>
      <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {recipeData.value.map((recipe, i) => {
          return (
            <div
              key={i}
              class={classNames(
                i === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
                i === 1 ? "sm:rounded-tr-lg" : "",
                i === recipeData.value.length - 2 ? "sm:rounded-bl-lg" : "",
                i === recipeData.value.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
              )}
            >
              <a href={"/recipe/" + recipe.id + "/"}>
                <div class="mt-8 flex justify-between">
                  <div>
                    <p class="font-bold underline">{recipe.name}</p>
                  </div>
                </div>
                <span
                  class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-pink-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Recipes",
  meta: [
    {
      name: "description",
      content: "Learn healthy, fish portions and nutritional contents",
    },
  ],
};
