import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { animate } from "motion";
import type Fish from "~/types/Fish";
import { LAKES } from "~/constants/lakes";
import { server$ } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

type Props = {
  showSearch: { value: boolean };
};

type Recipe = {
  recipe_id: string;
  recipe_name: string;
};

export const fetchSearchData = server$(async function () {
  const { apiKey, domain } = getFetchDetails(this.env);
  const res = await fetch(`${domain}/v1/search`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return await res.json();
});

export default component$<Props>(({ showSearch }) => {
  const modalRef = useSignal<Element>();
  const inputRef = useSignal<Element>();
  const backdropRef = useSignal<Element>();
  const search = useSignal("");
  const fishResults = useSignal<Fish[]>([]);
  const recipeResults = useSignal<Recipe[]>([]);

  const filteredFish = fishResults.value.filter(
    (c) =>
      c.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
      (c.anishinaabe_name &&
        c.anishinaabe_name.toLowerCase().indexOf(search.value.toLowerCase()) >
          -1)
  );

  const filteredRecipes = recipeResults.value.filter(
    (c) => c.recipe_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
  );

  const filteredLakes = LAKES?.filter(
    (c) => c.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useVisibleTask$(() => inputRef.value?.focus());

  useVisibleTask$(({ cleanup }) => {
    window.document.body.style.overflow = "hidden";
    cleanup(() => {
      window.document.body.style.overflow = "";
    });
  });

  useVisibleTask$(async () => {
    if (
      !window.localStorage.getItem("fish") ||
      !window.localStorage.getItem("recipes") ||
      typeof window.localStorage.getItem("fish") === undefined ||
      typeof window.localStorage.getItem("recipes") === undefined
    ) {
      const data = await fetchSearchData();
      const fish = data.fish_result;
      const recipes = data.recipe_result;

      fishResults.value = fish;
      recipeResults.value = recipes;

      if (
        fishResults.value &&
        fishResults.value.length > 0 &&
        recipeResults.value &&
        recipeResults.value.length > 0
      ) {
        window.localStorage.setItem("fish", JSON.stringify(fish));
        window.localStorage.setItem("recipes", JSON.stringify(recipes));
      }
    } else {
      if (window.localStorage.getItem("fish")) {
        fishResults.value = JSON.parse(
          window.localStorage.getItem("fish") || "[]"
        );
      }
      if (window.localStorage.getItem("recipes")) {
        recipeResults.value = JSON.parse(
          window.localStorage.getItem("recipes") || "[]"
        );
      }
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => showSearch.value);
    if (backdropRef.value && modalRef.value) {
      if (showSearch.value) {
        animate(
          backdropRef.value,
          { opacity: [0, 100] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
        animate(
          modalRef.value,
          { opacity: [0, 100], scale: [0.95, 1] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
      } else {
        animate(
          backdropRef.value,
          { opacity: [100, 0] },
          {
            duration: 0.2,
            easing: "ease-in",
          }
        );
      }
    }
  });

  return (
    <div
      class="relative z-10"
      role="dialog"
      aria-modal="true"
      onMouseDown$={(event) => {
        if (event.target === modalRef.value) {
          showSearch.value = false;
        }
      }}
    >
      <div
        ref={backdropRef}
        class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity z-1"
      ></div>
      <div
        class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        ref={modalRef}
      >
        <div class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black ring-opacity-5 dark:ring-gray-800 backdrop-blur backdrop-filter transition-all">
          <div class="relative">
            <svg
              class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 dark:text-gray-100"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              ref={inputRef}
              tabIndex={0}
              type="text"
              class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-100 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              autoFocus
              bind:value={search}
            />
          </div>

          <ul
            tabIndex={-1}
            class="max-h-96 scroll-py-2 divide-y divide-gray-500  divide-opacity-10 overflow-y-auto"
          >
            {fishResults.value.length === 0 && (
              <li class="p-2">
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Fish
                </h2>
                <ul>
                  {Array.from(Array(10).keys()).map((_, i) => (
                    <li class="p-2" key={`${i}-skele`}>
                      <div class="h-6 bg-gray-50 dark:bg-gray-900/50" />
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {filteredFish.length > 0 && (
              <li class="p-2">
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Fish
                </h2>
                <ul class="text-sm text-gray-700 dark:text-gray-300">
                  {fishResults.value?.length > 0 &&
                    filteredFish.map((fish, i) => (
                      <a href={"/fish/type/" + fish.fish_id + "/"} key={i}>
                        <li
                          class="group flex cursor-default select-none items-center
                                 rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5
                                 hover:text-gray-900 focus:ring-1 focus:bg-gray-900 focus:bg-opacity-5 
                                 focus:text-gray-900 focus:ring-offset-teal-500 focus:ring-gray-50
                                 focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-900 dark:hover:text-gray-100"
                          tabIndex={0}
                        >
                          <img
                            src={`/images/${fish.fish_image}`}
                            alt={fish.name}
                            class="h-8 w-14 flex-none text-gray-900 text-opacity-40"
                          />
                          <span class="ml-3 flex-auto truncate">
                            {fish.anishinaabe_name ? (
                              `${fish.anishinaabe_name} - ${fish.name}`
                            ) : (
                              <span>{fish.name}</span>
                            )}
                          </span>
                        </li>
                      </a>
                    ))}
                </ul>
              </li>
            )}
            {filteredRecipes.length > 0 && (
              <li class="p-2">
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Recipes
                </h2>
                <ul class="text-sm text-gray-700 dark:text-gray-300">
                  {filteredRecipes.map((recipe, i) => (
                    <a href={"/recipe/" + recipe.recipe_id + "/"} key={i}>
                      <li
                        class="group flex cursor-default select-none items-center rounded-md px-3 py-2 
                                hover:bg-gray-900 hover:bg-opacity-5 hover:text-gray-900 
                                focus:ring-1 focus:bg-gray-900 focus:bg-opacity-5 
                                focus:text-gray-900 focus:ring-offset-teal-500 focus:ring-gray-50
                                focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-900 dark:hover:text-gray-100"
                        tabIndex={0}
                      >
                        <svg
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6 flex-none text-gray-900 text-opacity-40 dark:fill-gray-100"
                        >
                          <g>
                            <path d="m38.301 90.5c-1.6992 0-3-1.3008-3-3v-47.602c-4.3984-1.8984-7.3984-8-7.3984-14.801 0-8.6016 4.6992-15.5 10.398-15.5s10.398 7 10.398 15.5c0 6.8984-3 12.898-7.3984 14.801v47.602c0 1.6016-1.4023 3-3 3zm0-80c-5.1992 0-9.3984 6.5-9.3984 14.5 0 6.6016 2.8984 12.398 7.1016 14l0.30078 0.10156v48.199c0 1.1016 0.89844 2 2 2 1.1016 0 2-0.89844 2-2l-0.003907-48.102 0.30078-0.10156c4.1992-1.6016 7.1016-7.3984 7.1016-14-0.003906-8.0977-4.2031-14.598-9.4023-14.598z" />
                            <path d="m62.602 90.5c-1.6992 0-3-1.3008-3-3v-47.602c-4.3984-1.8984-7.5-8-7.5-14.898 0-0.60156 0.10156-13 0.10156-13 0-0.69922 0.30078-1.3984 0.80078-1.8984s1.1992-0.69922 1.8984-0.69922c1 0.10156 1.8008 1 1.8008 2v16.301c0 0.69922 0.39844 1.1992 1 1.3984l-0.003906-17.602c0-1.1016 0.89844-2 2-2h0.39844c1.1016 0 2 0.89844 2 2v17.301c0 0.30078 0.19922 0.5 0.5 0.5 0.30078 0 0.5-0.19922 0.5-0.5l0.003906-17.301c0-1.1016 0.89844-2 2-2h0.39844c1.1016 0 2 0.89844 2 2v17.699c0.60156-0.19922 1-0.80078 1-1.3984v-16.301c0-1 0.80078-1.8984 1.8008-2 0.69922-0.10156 1.3984 0.19922 1.8984 0.69922s0.80078 1.1992 0.80078 1.8984c0 0 0.10156 12.398 0.10156 13 0 6.8984-3.1016 12.898-7.5 14.898v47.602c0 1.5039-1.4023 2.9023-3 2.9023zm-7.9023-80c-0.39844 0-0.80078 0.10156-1.1016 0.39844-0.30078 0.30078-0.5 0.69922-0.5 1.1016 0 0-0.10156 12.398-0.10156 13 0 6.6016 3 12.398 7.1992 14.102l0.30078 0.10156v48.199c0 1.1016 0.89844 2 2 2 1.1016 0 2-0.89844 2-2l0.003906-48.203 0.30078-0.10156c4.1992-1.6016 7.1992-7.3984 7.1992-14.102 0-0.60156-0.10156-12.898-0.10156-12.898 0-0.39844-0.19922-0.80078-0.5-1.1016-0.30078-0.30078-0.80078-0.39844-1.1992-0.39844-0.5 0-0.89844 0.5-0.89844 1v16.301c0 1.3984-1.1016 2.5-2.5 2.5h-0.5v-18.898c0-0.60156-0.5-1-1-1h-0.39844c-0.60156 0-1 0.5-1 1v17.301c0 0.80078-0.69922 1.5-1.5 1.5-0.80078 0-1.5-0.69922-1.5-1.5l-0.003906-17.301c0-0.60156-0.5-1-1-1h-0.39844c-0.60156 0-1 0.5-1 1v18.801h-0.5c-1.3984 0-2.5-1.1016-2.5-2.5v-16.301c0-0.5-0.39844-1-0.89844-1h0.097657z" />
                          </g>
                        </svg>
                        <span class="ml-3 flex-auto truncate">
                          {recipe.recipe_name}
                        </span>
                      </li>
                    </a>
                  ))}
                </ul>
              </li>
            )}
            {filteredLakes.length > 0 && (
              <li class="p-2">
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Lakes
                </h2>
                <ul class="text-sm text-gray-700 dark:text-gray-300">
                  {filteredLakes.map((lake, i) => (
                    <a href={`/?lake=${lake.name}`} key={i}>
                      <li
                        class="group flex cursor-default select-none items-center rounded-md px-3 py-2 
                                hover:bg-gray-900 hover:bg-opacity-5 hover:text-gray-900 
                                focus:ring-1 focus:bg-gray-900 focus:bg-opacity-5 
                                focus:text-gray-900 focus:ring-offset-teal-500 focus:ring-gray-50
                                focus:ring-offset-2 focus:outline-none dark:hover:bg-gray-900 dark:hover:text-gray-100"
                        tabIndex={0}
                      >
                        <span dangerouslySetInnerHTML={lake.svg} />
                        <span class="ml-3 flex-auto truncate">{lake.name}</span>
                      </li>
                    </a>
                  ))}
                </ul>
              </li>
            )}
          </ul>

          {filteredLakes.length === 0 &&
            filteredRecipes.length === 0 &&
            filteredFish.length === 0 && (
              <div class="px-6 py-14 text-center sm:px-14">
                <svg
                  width="100pt"
                  height="100pt"
                  version="1.1"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mx-auto h-6 w-6 fill-gray-500 dark:text-gray-100"
                >
                  <g>
                    <path d="m68.961 63.422c5.1289-6.3594 7.918-14.219 7.918-22.48 0-19.82-16.121-35.941-35.938-35.941-19.82 0-35.941 16.121-35.941 35.941 0 19.809 16.121 35.93 35.941 35.93 8.3906 0 16.336-2.8594 22.746-8.1211l25.711 25.949 5.3242-5.2695zm-28.02 9.7031c-17.754 0-32.191-14.438-32.191-32.188 0-17.754 14.438-32.191 32.191-32.191 17.746 0 32.191 14.438 32.191 32.191 0 17.75-14.445 32.188-32.191 32.188z" />
                    <path d="m52.375 50.289-9.3711-9.4297 9.3633-9.3359-2.0391-2.043-9.3633 9.332-9.3789-9.4258-2.0469 2.0352 9.375 9.4297-9.3672 9.3359 2.0352 2.043 9.3711-9.332 9.375 9.4258z" />
                  </g>
                </svg>
                <p class="mt-4 text-sm text-gray-900 dark:text-gray-100">
                  We couldn't find anything with that term. Please try again.
                </p>
              </div>
            )}

          <ul class="max-h-96 overflow-y-auto p-2 text-sm text-gray-700 dark:text-gray-300">
            <li class="group flex cursor-default select-none items-center rounded-md px-3 py-2">
              <svg
                class="h-6 w-6 flex-none text-gray-900 text-opacity-40 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <a href="/splash">
                <span class="ml-3 flex-auto truncate" tabIndex={0}>
                  Treaty Information
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
