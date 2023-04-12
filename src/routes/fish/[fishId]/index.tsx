import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { calculateServings } from "~/helpers";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";
import type Recipe from "~/types/Recipe";
import type UserDetails from "~/types/UserDetails";

type FishData = {
  fish_data: Fish;
  recipe_data: Recipe[];
};

export const useFishData = routeLoader$<FishData>(async ({ env, params }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/fish/${params.fishId}`,
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
//   <a href={`/fish/${fishData.value.id}/edit`}>[Edit]</a>
export default component$(() => {
  const fishData = useFishData();
  const userDetails = useUserDetails();

  return (
    <div class="min-h-full">
      <main class="pb-10">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div class="flex justify-center items-center flex-wrap space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                {fishData.value.fish_data.woodland_fish_image ? (
                  <img
                    class="h-32 sm:h-56"
                    src={`/images/${fishData.value.fish_data.woodland_fish_image}`}
                  />
                ) : (
                  <img
                    class="h-32 sm:h-56"
                    src={`/images/${fishData.value.fish_data.fish_image}`}
                  />
                )}
              </div>
            </div>
            <div>
              <h1 class="text-4xl font-bold">
                {fishData.value.fish_data.anishinaabe_name ? (
                  <>
                    {fishData.value.fish_data.anishinaabe_name}
                    <span class="text-xs pl-2">
                      [{fishData.value.fish_data.name}]
                    </span>
                  </>
                ) : (
                  fishData.value.fish_data.name
                )}
              </h1>
            </div>
          </div>
          <div class="mt-10 sm:mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
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

        <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2 lg:col-start-1">
            <section aria-labelledby="applicant-information-title">
              <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Servings per week
                  </h2>
                  <span class="inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800">
                    {!userDetails.value.needed &&
                    userDetails.value.weight !== undefined &&
                    userDetails.value.age !== undefined &&
                    userDetails.value.portion !== undefined
                      ? calculateServings(
                          userDetails.value.age,
                          userDetails.value.weight,
                          userDetails.value.portion,
                          fishData.value.fish_data
                        )
                      : "? servings per week"}
                  </span>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Protien</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.fish_data.protein}
                        <span class="text-xs text-gray-700">g per 100g</span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">PCB</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.fish_data.pcb}{" "}
                        <span class="text-xs text-gray-700">ppm</span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Omega 3/6 Ratio
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.fish_data.omega_3_ratio}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Mercury</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.fish_data.mercury}{" "}
                        <span class="text-xs text-gray-700">ppm</span>
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">About</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            class="lg:col-span-1 lg:col-start-3"
          >
            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="recipes-title" class="text-lg font-medium text-gray-900">
                Recipes
              </h2>

              <div class="mt-6 flow-root">
                <ul role="list" class="-mb-8">
                  {fishData.value.recipe_data.map((recipe, i) => (
                    <li key={i}>
                      <a href={`/recipe/${recipe.id}/`}>
                        <div class="relative pb-8">
                          <div class="relative flex space-x-3 text-gray-500 hover:bg-gray-200 hover:text-black">
                            <div>
                              <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  class="h-5 w-5 flex-none text-white text-opacity-80"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p class="text-sm ">{recipe.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const fish = resolveValue(useFishData);
  return {
    title: fish.fish_data.anishinaabe_name,
    meta: [
      {
        name: "description",
        content: `Learn the nutritional details of a ${fish.fish_data.name}`,
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};
