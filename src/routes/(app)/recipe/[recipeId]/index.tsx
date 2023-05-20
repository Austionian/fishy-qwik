import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";
import type Recipe from "~/types/Recipe";

export const useRecipeData = routeLoader$<Recipe>(async ({ env, params }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/recipe/${params.recipeId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return await res.json();
});

export default component$(() => {
  const recipeData = useRecipeData();

  return (
    <div class="min-h-full">
      <main class="pb-10">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div class="flex justify-center items-center flex-wrap space-x-5">
            <div class="flex-shrink-0">
              <div class="relative ">
                <svg
                  class="h-32 sm:h-56"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100pt"
                  height="100pt"
                  version="1.1"
                  viewBox="0 0 100 100"
                >
                  <g>
                    <path d="m54.477 26.812c-0.47656 0-0.9375 0.046875-1.3906 0.125-1.4531-2.8828-4.4453-4.8594-7.8945-4.8594-3.4531 0-6.4375 1.9805-7.8945 4.8594-0.45312-0.078125-0.91797-0.125-1.3906-0.125-4.3516 0-7.875 3.5273-7.875 7.875 0 3.3789 2.1328 6.2617 5.125 7.3789 0.35938 0.13281 0.60938 0.46875 0.60938 0.85547l-0.003906 7.3359h-0.32031c-0.64844 0-1.1758 0.52734-1.1758 1.1758v2.9062c0 0.64844 0.52734 1.1758 1.1758 1.1758h23.25c0.64844 0 1.1758-0.52734 1.1758-1.1758v-2.9062c0-0.64844-0.52734-1.1758-1.1758-1.1758h-0.0625l-0.003906-7.3359c0-0.38672 0.24609-0.72266 0.60938-0.85547 2.9922-1.1172 5.125-4 5.125-7.3789-0.003906-4.3438-3.5312-7.875-7.8828-7.875zm-14.664 11.141c-0.13281 0.14844-0.32031 0.22656-0.50781 0.22656-0.16406 0-0.32813-0.054688-0.45313-0.17188-2.0156-1.8047-3.1719-4.3906-3.1719-7.0938 0-0.53125 0.046874-1.0625 0.13281-1.5859 0.0625-0.375 0.41406-0.62109 0.78906-0.5625 0.375 0.0625 0.625 0.41406 0.5625 0.78906-0.074218 0.44531-0.11328 0.90234-0.11328 1.3594 0 2.3164 0.99219 4.5312 2.7188 6.0781 0.26953 0.25 0.29297 0.67969 0.042969 0.96094zm1.793 12.312h-1.3672v-5.375c0-0.375 0.30469-0.68359 0.68359-0.68359s0.68359 0.30469 0.68359 0.68359zm4.5586 0h-1.3672v-6.3516c0-0.375 0.30469-0.68359 0.68359-0.68359 0.37891 0 0.68359 0.30469 0.68359 0.68359zm4.5625 0h-1.3672v-5.2109c0-0.375 0.30469-0.68359 0.68359-0.68359 0.37891 0 0.68359 0.30469 0.68359 0.68359z" />
                    <path d="m92.203 40.562h-6.7148v-9.4883c0-0.375-0.30469-0.68359-0.68359-0.68359-0.37891 0-0.68359 0.30469-0.68359 0.68359v9.4883h-3.8047v-13.094h6.7461c1.1484 0 2.0781-0.93359 2.0781-2.0781v-4.9961c0-1.1484-0.93359-2.0781-2.0781-2.0781h-1.5781v-12.605c0-1.7891-1.4531-3.2422-3.2422-3.2422h-66.898c-1.7891 0-3.2422 1.4531-3.2422 3.2422v6.4336l-2.8047 0.003907c-1.9727 0-3.5781 1.6055-3.5781 3.5781 0 1.9727 1.6055 3.5781 3.5781 3.5781h2.8047v14.707l-2.8047-0.003907c-1.9727 0-3.5781 1.6055-3.5781 3.5781 0 1.9727 1.6055 3.5781 3.5781 3.5781h6.9766c1.9727 0 3.5781-1.6055 3.5781-3.5781 0-1.9727-1.6055-3.5781-3.5781-3.5781h-2.8047v-14.707h2.8047c1.9727 0 3.5781-1.6055 3.5781-3.5781s-1.6055-3.5781-3.5781-3.5781h-2.8047v-6.4336c0-1.0312 0.83984-1.875 1.875-1.875h56.586c1.0312 0 1.875 0.83984 1.875 1.875v88.574c0 1.0312-0.83984 1.875-1.875 1.875l-56.586 0.003906c-1.0312 0-1.875-0.83984-1.875-1.875v-9.3906h2.8047c1.9727 0 3.5781-1.6055 3.5781-3.5781 0-1.9727-1.6055-3.5781-3.5781-3.5781h-2.8047v-14.707h2.8047c1.9727 0 3.5781-1.6055 3.5781-3.5781 0-1.9727-1.6055-3.5781-3.5781-3.5781h-2.8047v-11.473c0-0.375-0.30469-0.68359-0.68359-0.68359s-0.68359 0.30469-0.68359 0.68359v11.473h-2.8047c-1.9727 0-3.5781 1.6055-3.5781 3.5781 0 1.9727 1.6055 3.5781 3.5781 3.5781h2.8047v14.707h-2.8047c-1.9727 0-3.5781 1.6055-3.5781 3.5781 0 1.9727 1.6055 3.5781 3.5781 3.5781h2.8047v9.3906c0 1.7891 1.4531 3.2422 3.2422 3.2422h56.586c1.7891 0 3.2422-1.4531 3.2422-3.2422v-2.2773h1.8984c1.7891 0 3.2422-1.4531 3.2422-3.2422v-39.051h3.8047v44.57c0 1.0312-0.83984 1.875-1.875 1.875h-4.5859c-0.375 0-0.68359 0.30469-0.68359 0.68359s0.30469 0.68359 0.68359 0.68359h4.5859c1.7891 0 3.2422-1.4531 3.2422-3.2422l0.003906-44.57h6.7148c1.1484 0 2.0781-0.93359 2.0781-2.0781v-4.9961c0-1.1523-0.93359-2.082-2.0781-2.082zm-75.93-5.1875c1.2188 0 2.2109 0.99219 2.2109 2.2109s-0.99219 2.2109-2.2109 2.2109h-6.9766c-1.2188 0-2.2109-0.99219-2.2109-2.2109s0.99219-2.2109 2.2109-2.2109zm0-21.863c1.2188 0 2.2109 0.99219 2.2109 2.2109s-0.99219 2.2109-2.2109 2.2109h-6.9766c-1.2188 0-2.2109-0.99219-2.2109-2.2109s0.99219-2.2109 2.2109-2.2109zm-6.9766 48.152c-1.2188 0-2.2109-0.99219-2.2109-2.2109s0.99219-2.2109 2.2109-2.2109h6.9766c1.2188 0 2.2109 0.99219 2.2109 2.2109s-0.99219 2.2109-2.2109 2.2109zm0 21.867c-1.2188 0-2.2109-0.99219-2.2109-2.2109s0.99219-2.2109 2.2109-2.2109h6.9766c1.2188 0 2.2109 0.99219 2.2109 2.2109s-0.99219 2.2109-2.2109 2.2109zm77.766-63.859c0.39062 0 0.71094 0.32031 0.71094 0.71094v4.9961c0 0.39062-0.32031 0.71094-0.71094 0.71094h-2.0391c-0.25-2.8672-2.0547-5.293-4.5703-6.4219l6.6094 0.007812zm-8.1172 21.57v47.527c0 1.0312-0.83984 1.875-1.875 1.875h-1.8984l-0.003906-63.18h3.7734v13.777zm0-22.938h-3.7734v-9.2305h1.8984c1.0312 0 1.875 0.83984 1.875 1.875zm-1.875-10.598h-1.8984v-1.9961c0-0.69922-0.22266-1.3438-0.60156-1.875h7.6719c1.0312 0 1.875 0.83984 1.875 1.875v12.594h-3.8047v-7.3594c0-1.7852-1.4531-3.2383-3.2422-3.2383zm15.844 39.93c0 0.39062-0.32031 0.71094-0.71094 0.71094h-3.3672c0.75781-0.59375 1.25-1.5156 1.25-2.5547 0-1.6328-0.85938-3.0664-2.1562-3.8711h4.2695c0.39062 0 0.71094 0.32031 0.71094 0.71094z" />
                    <path d="m60.977 61.809h-31.559c-0.375 0-0.68359 0.30469-0.68359 0.68359 0 0.37891 0.30469 0.68359 0.68359 0.68359h31.559c0.375 0 0.68359-0.30469 0.68359-0.68359 0-0.37891-0.30859-0.68359-0.68359-0.68359z" />
                    <path d="m60.977 69.523h-31.559c-0.375 0-0.68359 0.30469-0.68359 0.68359 0 0.37891 0.30469 0.68359 0.68359 0.68359h31.559c0.375 0 0.68359-0.30469 0.68359-0.68359 0-0.37891-0.30859-0.68359-0.68359-0.68359z" />
                    <path d="m60.977 77.238h-31.559c-0.375 0-0.68359 0.30469-0.68359 0.68359s0.30469 0.68359 0.68359 0.68359h31.559c0.375 0 0.68359-0.30469 0.68359-0.68359 0-0.375-0.30859-0.68359-0.68359-0.68359z" />
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-4xl font-bold">{recipeData.value.name}</h1>
            </div>
          </div>
          <div class="mt-10 sm:mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
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
          </div>
        </div>

        <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-full">
          <div class="space-y-6 w-full">
            <section aria-labelledby="applicant-information-title">
              <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="ingredients-list"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Ingredients
                  </h2>
                  <div class="relative">
                    <div
                      class="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                  </div>
                </div>
                <div class="px-8">
                  {recipeData.value.ingredients.map((ingredient, i) => (
                    <div class="space-y-5 mb-2" key={i}>
                      <div class="relative flex items-start">
                        <div class="flex h-6 items-center">
                          <input
                            id={ingredient}
                            aria-describedby={ingredient}
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                          />
                        </div>
                        <div class="ml-3 text-sm leading-6">
                          <label
                            for={ingredient}
                            class="font-medium text-gray-900"
                          >
                            {ingredient}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="ingredients-list"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Preparation
                  </h2>
                  <div class="relative">
                    <div
                      class="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                  </div>
                </div>
                <div class="px-8 pb-3">
                  {recipeData.value.steps.map((step, i) => (
                    <div class="space-y-5 mb-3" key={i}>
                      <div class="relative flex items-start flex-col">
                        <h4 class="text-gray-700">Step {i + 1}</h4>
                        <div class="ml-3 text-sm leading-6">
                          <p class="font-medium text-gray-900">{step}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const recipe = resolveValue(useRecipeData);
  return {
    title: recipe.name,
    meta: [
      {
        name: "description",
        content: `Learn the ingredients of and how to cook ${recipe.name}`,
      },
      {
        name: "id",
        content: params.recipeId,
      },
    ],
  };
};
