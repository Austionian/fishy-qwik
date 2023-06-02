import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { animate } from "motion";
import { classNames, calculateServings, getFetchDetails } from "~/helpers";
import SORT_VALUES, { sorter } from "~/constants/sortValues";
import type Fish from "~/types/Fish";
import type LakeValues from "~/types/LakeValues";
import type UserDetails from "~/types/UserDetails";
import type SortValues from "~/types/SortValues";

import InfoModal from "~/components/info-modal/info-modal";
import FishDetails from "~/components/fish-details/fish-details";
import LakeFilters from "../lake-filters/lake-filters";
import { server$ } from "@builder.io/qwik-city";

type Props = {
  fishData: {
    data: Fish[];
  };
  userDetails: {
    data: UserDetails;
  };
  fishFilter: LakeValues;
};

export const fetchFish = server$(async function (lakeName: string) {
  const { apiKey, domain } = getFetchDetails(this.env);
  const res = await fetch(`${domain}/v1/fishs?lake=${lakeName}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return await res.json();
});

export default component$(({ fishData, userDetails, fishFilter }: Props) => {
  const showUserDetialsModal = useSignal(userDetails.data.needed);
  const showSortMenu = useSignal(false);
  const sortBy = useSignal<SortValues>("Name");
  const filterBy = useSignal<LakeValues>(fishFilter);
  const ref = useSignal<Element>();

  useTask$(async ({ track }) => {
    track(() => sortBy.value);

    fishData.data.sort(sorter[sortBy.value].fn);
  });

  useTask$(async ({ track }) => {
    track(() => filterBy.value);

    if (isBrowser) {
      if (
        window.localStorage.getItem(filterBy.value) &&
        window.localStorage.getItem(filterBy.value) !== undefined
      ) {
        fishData.data = JSON.parse(
          window.localStorage.getItem(filterBy.value) || "[]"
        );
        fishData.data.sort(sorter[sortBy.value].fn);
      } else {
        const fish: Fish[] = await fetchFish(filterBy.value);
        fishData.data = fish;
        fishData.data.sort(sorter[sortBy.value].fn);
        window.localStorage.setItem(filterBy.value, JSON.stringify(fish));
      }
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => showSortMenu.value);
    if (ref.value) {
      if (showSortMenu.value) {
        animate(
          ref.value,
          { opacity: [0, 100], scale: [0.95, 1] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
      } else {
        animate(
          ref.value,
          { opacity: [100, 0], scale: [0.95, 0] },
          {
            duration: 0.075,
            easing: "ease-in",
          }
        );
      }
    }
  });

  // useVisibleTask$(({ track }) => {
  //   track(() => fishData.data);
  //   track(() => sortBy.value);
  //
  //   const li = document.querySelectorAll(".fishCard");
  //   if (!li[0]) return;
  //
  //   animate(
  //     li,
  //     { opacity: [0, 1], scale: [0, 1] },
  //     { delay: stagger(0.1), easing: "ease-in-out" }
  //   );
  // });

  return (
    <>
      {showUserDetialsModal.value && (
        <InfoModal
          showUserInputModal={showUserDetialsModal}
          userDetails={userDetails}
        />
      )}
      <div class="flex justify-between">
        <LakeFilters filterBy={filterBy} />
        <div>
          <div class="max-w-min mb-2">
            <div class="relative">
              <div>
                <button
                  type="button"
                  class="inline-flex w-full justify-center gap-x-1.5 rounded-md
                         bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900
                         shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 hover:bg-gray-50 dark:hover:bg-gray-700
                         focus:ring-offset-teal-500 focus:ring-gray-50 focus:ring-offset-2
                         focus:outline-none"
                  id="sort-menu-button"
                  aria-label="sort"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick$={() => (showSortMenu.value = !showSortMenu.value)}
                >
                  <svg
                    class="-ml-0.5 h-5 w-5 text-gray-400 dark:text-gray-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.75A.75.75 0 012.75 3h11.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zM2 7.5a.75.75 0 01.75-.75h6.365a.75.75 0 010 1.5H2.75A.75.75 0 012 7.5zM14 7a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02l-1.95-2.1v6.59a.75.75 0 01-1.5 0V9.66l-1.95 2.1a.75.75 0 11-1.1-1.02l3.25-3.5A.75.75 0 0114 7zM2 11.25a.75.75 0 01.75-.75H7A.75.75 0 017 12H2.75a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="hidden sm:block dark:text-gray-200">Sort</span>
                  <svg
                    class="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {showSortMenu.value && (
                <div
                  ref={ref}
                  class="absolute z-10 w-56 origin-top-right right-0 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white/10 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="sort-menu-button"
                  tabIndex={0}
                >
                  <div class="py-1" role="none">
                    {SORT_VALUES.map((sort, i) => (
                      <a
                        class={
                          sortBy.value === sort
                            ? "text-gray-900 block px-4 py-2 text-sm bg-gray-100 dark:text-gray-100 dark:bg-white/10"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-800 block px-4 py-2 text-sm cursor-pointer dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-gray-200"
                        }
                        key={i}
                        role="menuitem"
                        tabIndex={0}
                        id="sort-menu-item-0"
                        onClick$={() => {
                          sortBy.value = sort;
                          showSortMenu.value = !showSortMenu.value;
                        }}
                      >
                        {sort}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="divide-y divide-gray-200 rounded-lg dark:ring-1 dark:ring-white/10 bg-gray-200 dark:bg-gray-900 shadow grid sm:gap-px sm:divide-y-0">
        {fishData.data.map((fish, i) => {
          const link =
            filterBy.value === "All"
              ? `/fish/type/${fish.fish_id}/`
              : `/fish/${fish.fish_id}/`;
          return (
            <div
              key={i}
              class={classNames(
                i === 0 ? "rounded-tl-lg rounded-tr-lg" : "",
                i === fishData.data.length - 1
                  ? "rounded-bl-lg rounded-br-lg"
                  : "",
                "block lg:flex lg:justify-between group relative bg-white dark:bg-gray-900/80 dark:ring-1 dark:ring-white/10 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500 fishCard"
              )}
            >
              <div
                class="cursor-pointer min-w-[312px]"
                onClick$={() => (window.location.href = link)}
              >
                <img
                  src={`/images/${fish.fish_image}`}
                  alt={fish.name}
                  class="h-44"
                />
              </div>
              <div class="mr-8">
                <div class="mt-4 flex justify-between">
                  <div
                    class="cursor-pointer flex-grow"
                    onClick$={() => (window.location.href = link)}
                  >
                    <p class="font-extralight text-xl group-hover:text-teal-500 dark:text-gray-200">
                      {fish.anishinaabe_name
                        ? fish.anishinaabe_name
                        : fish.name}
                    </p>
                    <span class="text-sm group-hover:text-teal-500 dark:text-gray-200">
                      {fish.anishinaabe_name ? ` ${fish.name}` : null}
                    </span>
                  </div>
                  <div onClick$={() => (showUserDetialsModal.value = true)}>
                    <span class="cursor-pointer ml-4 inline-flex items-center rounded-full bg-teal-100 text-sm font-medium px-3 py-0.5 text-teal-800 hover:bg-teal-200 hover:text-teal-900 hover:ring-teal-300 hover:ring-2">
                      {calculateServings(
                        userDetails.data.age,
                        userDetails.data.weight,
                        userDetails.data.portion,
                        userDetails.data.sex,
                        userDetails.data.plan_to_get_pregnant || "",
                        fish
                      )}
                    </span>
                  </div>
                </div>
                <div
                  class="pt-5 cursor-pointer"
                  onClick$={() => (window.location.href = link)}
                >
                  <FishDetails fish={fish} index />
                </div>
                <div
                  onClick$={() => (window.location.href = link)}
                  class="hidden max-w-full sm:block lg:max-w-3xl text-sm font-light text-gray-700 dark:text-gray-300 mt-4 lg:mt-2 cursor-pointer"
                >
                  {fish.about}
                </div>
                <span
                  class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-teal-400"
                  aria-hidden="true"
                >
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});
