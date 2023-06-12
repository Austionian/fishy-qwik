import { component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  server$,
  routeLoader$,
} from "@builder.io/qwik-city";
import NavBack from "~/components/nav-back/nav-back";
import { getFetchDetails } from "~/helpers";
import type Recipe from "~/types/Recipe";

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
        cookie: `user_id=${cookie.get("user_id")?.value}`,
      },
    });
    try {
      return await res.json();
    } catch {
      return fail(404, {
        errorMessage: "Recipe not found.",
      });
    }
  }
);

export const serverSaveRecipeFavorite = server$(async function (
  favorite: boolean,
  recipe_id: string
) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  const user_id = this.cookie.get("user_id")?.value;

  const response = await fetch(
    `${domain}/v1/${favorite ? "favorite" : "unfavorite"}/recipe/${recipe_id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        cookie: `user_id=${user_id}`,
      },
    }
  );

  if (!response.ok) {
    console.error(response.statusText);
    return {
      failed: true,
      error: `Error: ${response.statusText}`,
    };
  }
});

export default component$(() => {
  const recipeData = useRecipeData();
  const favorite = useSignal(recipeData.value.is_favorite);
  const randomNumber = useSignal(Math.floor(Math.random() * 5) + 1);

  if (recipeData.value.errorMessage) {
    return <div>{recipeData.value.errorMessage}</div>;
  }

  return (
    <div class="min-h-full">
      <main class="pb-10">
        <NavBack href={"/recipe"} text={"recipes"} />
        <div class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8 mb-10">
          <div class="flex justify-center items-center flex-wrap space-x-5">
            <div class="flex-shrink-0">
              <div class="relative my-2">
                <img
                  src={`/images/dish${randomNumber.value}.webp`}
                  alt={"Stock fish dish image"}
                  class="h-[300px] sm:h-56 w-[90vw] object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto max-w-3xl px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-5 lg:max-w-7xl lg:px-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {recipeData.value.data.name}
            </h1>
          </div>
          <div class="mt-6 sm:mt-0 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse">
            {favorite.value ? (
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                onClick$={() => {
                  serverSaveRecipeFavorite(false, recipeData.value.data.id);
                  favorite.value = false;
                }}
              >
                ♥
              </button>
            ) : (
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                onClick$={() => {
                  serverSaveRecipeFavorite(true, recipeData.value.data.id);
                  favorite.value = true;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100pt"
                  height="100pt"
                  version="1.1"
                  viewBox="0 0 100 100"
                  class="h-6 w-6 mr-2"
                  fill="white"
                >
                  <path d="m25.551 29.172c-5.9766 5.9766-5.9961 15.688-0.0625 21.691l0.003907 0.003907 20.738 22.766c0.99219 1.1016 2.3281 1.707 3.7656 1.707s2.7734-0.60547 3.7578-1.6992l20.75-22.773c5.9336-6.0039 5.9141-15.715-0.058594-21.695-5.9688-5.9648-15.668-5.9922-21.672-0.078125l-2.7734 2.3281-2.7734-2.3281c-6.0039-5.9141-15.703-5.8906-21.676 0.078125zm46.34 2.5547c4.5859 4.5859 4.5859 12.051 0 16.637-0.011719 0.011719-0.019531 0.023438-0.03125 0.03125l-0.027344 0.027344-20.758 22.781c-0.29688 0.32812-0.67969 0.51172-1.0742 0.51172-0.39844 0-0.78125-0.18359-1.0859-0.51953l-20.742-22.77c-0.011719-0.011719-0.023437-0.019531-0.03125-0.03125-0.011719-0.011719-0.015625-0.019531-0.027344-0.03125-4.5859-4.5859-4.5859-12.051 0-16.637 4.5859-4.5859 12.051-4.5859 16.637 0 0.019531 0.019532 0.039062 0.035157 0.058594 0.050782 0.019531 0.019531 0.039062 0.035156 0.058594 0.054687l3.9727 3.332c0.011718 0.011719 0.027344 0.019532 0.039062 0.03125 0.019532 0.015626 0.042969 0.03125 0.0625 0.046876 0.03125 0.023437 0.0625 0.042968 0.09375 0.0625 0.019532 0.011718 0.039063 0.027343 0.058594 0.035156 0.050781 0.03125 0.10547 0.058594 0.15625 0.082031 0.003906 0.003906 0.003906 0.003906 0.007812 0.003906 0.054688 0.023438 0.10938 0.046875 0.16016 0.0625 0.015625 0.007813 0.03125 0.011719 0.042969 0.015625 0.042968 0.015625 0.085937 0.027344 0.12891 0.035156 0.015625 0.003907 0.035156 0.007813 0.050781 0.011719 0.042969 0.007813 0.089844 0.015625 0.13281 0.023438 0.015624 0.003906 0.03125 0.003906 0.046874 0.007812 0.058594 0.007813 0.11719 0.011719 0.17969 0.011719 0.058594 0 0.11719-0.003906 0.17969-0.011719 0.015624-0.003906 0.03125-0.003906 0.046874-0.007812 0.046876-0.007813 0.089844-0.011719 0.13281-0.023438 0.015625-0.003906 0.035156-0.007812 0.050781-0.011719 0.042969-0.011718 0.089844-0.023437 0.13281-0.035156 0.015625-0.003906 0.027343-0.007812 0.042969-0.015625 0.054687-0.019531 0.11328-0.039062 0.16797-0.066406 0.054688-0.023437 0.10547-0.050781 0.15625-0.085937 0.019532-0.011719 0.035156-0.023438 0.054688-0.035157 0.03125-0.019531 0.0625-0.042969 0.097656-0.0625 0.019531-0.015625 0.039062-0.03125 0.058594-0.046875 0.015625-0.011718 0.027344-0.019531 0.039062-0.03125l3.9766-3.332c0.023437-0.019531 0.042969-0.039063 0.0625-0.058594 0.019531-0.015625 0.039062-0.03125 0.054687-0.050781 4.5898-4.5742 12.051-4.5742 16.637 0.007812z" />
                </svg>
                Favorite
              </button>
            )}
          </div>
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
