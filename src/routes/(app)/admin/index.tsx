import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";
import type Fish from "~/types/Fish";
import type Recipe from "~/types/Recipe";

type EverythingFish = Fish & { id: string };

type Everything = {
  fishs: EverythingFish[];
  recipes: Recipe[];
};

export const useEverything = routeLoader$<Everything>(async ({ env }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/everything`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return await res.json();
});

export default component$(() => {
  const fishData = useEverything();
  const FISH_DATA: (keyof EverythingFish)[] = [
    "name",
    "anishinaabe_name",
    "lake",
    "protein",
    "pcb",
    "omega_3_ratio",
    "mercury",
  ];
  const RECIPE_DATA: (keyof Recipe)[] = ["name", "ingredients", "steps"];
  return (
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
            FISH
          </h1>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all the fish available in the system.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Add fish
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle bg-white dark:bg-gray-900/80 ring-1 ring-gray-300 dark:ring-white/10 rounded-md">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {FISH_DATA.map((header, i) => (
                    <th
                      key={`${i}-fish-header`}
                      scope="col"
                      class={
                        header === "name"
                          ? "sticky top-0 z-10 border-b border-gray-300 dark:border-white/30 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 dark:text-gray-100"
                          : "sticky top-0 z-10 hidden border-b border-gray-300 dark:border-white/30 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell dark:text-gray-100"
                      }
                    >
                      {header.replace(/_/gi, " ")}
                    </th>
                  ))}
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 dark:border-white/30 bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fishData.value.fishs.map((fish, i) => (
                  <tr key={`${i}-fish-row`}>
                    {FISH_DATA.map((data_point, i) => (
                      <td
                        key={`${i}-${fish.name}-row`}
                        class={
                          data_point === "name"
                            ? "whitespace-nowrap border-b border-gray-200 dark:border-white/10 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6 lg:pl-8"
                            : "whitespace-nowrap border-b border-gray-200 dark:border-white/10 hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-300 lg:table-cell"
                        }
                      >
                        {fish[data_point]}
                      </td>
                    ))}
                    <td class="relative whitespace-nowrap border-b border-gray-200 dark:border-white/10 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8">
                      <a
                        href={`/fish/edit/${fish.id}`}
                        class="text-teal-600 hover:text-teal-900"
                      >
                        Edit<span class="sr-only">, {fish.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="sm:flex sm:items-center mt-24">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
            RECIPES
          </h1>
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all the recipes available in the system.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Add recipe
          </button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle bg-white dark:bg-gray-900/80 ring-1 ring-gray-300 dark:ring-white/10 rounded-md">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {RECIPE_DATA.map((header, i) => (
                    <th
                      key={`${i}-recipe-header`}
                      scope="col"
                      class={
                        header === "name"
                          ? "sticky top-0 z-10 border-b border-gray-300 dark:border-white/30 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 dark:text-gray-100"
                          : "sticky top-0 z-10 hidden border-b border-gray-300 dark:border-white/30 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell dark:text-gray-100"
                      }
                    >
                      {header.replace(/_/gi, " ")}
                    </th>
                  ))}
                  <th
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 dark:border-white/30 bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fishData.value.recipes.map((recipe, i) => (
                  <tr key={i}>
                    {RECIPE_DATA.map((data_point, i) => (
                      <td
                        key={`${i}-${recipe.name}-row`}
                        class={
                          data_point === "name"
                            ? "whitespace-nowrap border-b border-gray-200 dark:border-white/10 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6 lg:pl-8"
                            : "whitespace-nowrap border-b border-gray-200 dark:border-white/10 hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-300 lg:table-cell"
                        }
                      >
                        {data_point === "name"
                          ? recipe.name
                          : `${recipe[data_point]
                              .slice(0)
                              .toString()
                              .substring(0, 35)}...`}
                      </td>
                    ))}
                    <td class="relative whitespace-nowrap border-b border-gray-200 dark:border-white/10 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8">
                      <a
                        href={`/recipe/edit/${recipe.id}`}
                        class="text-teal-600 hover:text-teal-900"
                      >
                        Edit<span class="sr-only">, {recipe.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ params }) => {
  return {
    title: "Admin",
    meta: [
      {
        name: "description",
        content: "Admins only area.",
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};
