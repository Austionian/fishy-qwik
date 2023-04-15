import { component$, useSignal } from "@builder.io/qwik";
import { classNames, calculateServings } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

import InfoModal from "~/components/info-modal/info-modal";

type Props = {
  fishData: Fish[];
  userDetails: UserDetails;
};

export default component$(({ fishData, userDetails }: Props) => {
  const showUserDetialsBadge = useSignal(false);
  const showSort = useSignal(false);
  // const sortedFish = useSignal<Fish[]>([]);
  //
  // function sortName(a: Fish, b: Fish) {
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   return 0;
  // }
  //
  // sortedFish.value = fishData;
  return (
    <>
      {showUserDetialsBadge.value && (
        <InfoModal showUserInputModal={showUserDetialsBadge} />
      )}
      <div class="max-w-min mb-2">
        <div class="relative">
          <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="sort-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            onClick$={() => (showSort.value = !showSort.value)}
          >
            <svg
              class="-ml-0.5 h-5 w-5 text-gray-400"
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
            Sort
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
          {showSort.value && (
            <div
              class="absolute left-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="sort-menu-button"
              tabIndex={0}
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={0}
                  id="sort-menu-item-0"
                >
                  Name
                </a>
                {!userDetails.needed ? (
                  <a
                    href="#"
                    class="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={0}
                    id="sort-menu-item-1"
                  >
                    Servings
                  </a>
                ) : (
                  <span class="block px-4 py-2 text-sm text-gray-400 bg-gray-50">
                    Servings
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {fishData.map((fish, i) => {
          return (
            <div
              key={i}
              class={classNames(
                i === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
                i === 1 ? "sm:rounded-tr-lg" : "",
                i === fishData.length - 2 ? "sm:rounded-bl-lg" : "",
                i === fishData.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
              )}
            >
              <div
                onClick$={() =>
                  (window.location.href = `/fish/${fish.fish_id}/`)
                }
              >
                <img
                  src={`/images/${fish.fish_image}`}
                  alt={fish.name}
                  class="min-w-48 h-36"
                />
              </div>
              <div class="mt-8 flex justify-between">
                <div>
                  <p class="font-bold underline">
                    {fish.anishinaabe_name ? fish.anishinaabe_name : fish.name}
                  </p>
                  <span class="text-sm">
                    {fish.anishinaabe_name ? ` ${fish.name}` : null}
                  </span>
                </div>
                <div onClick$={() => (showUserDetialsBadge.value = true)}>
                  <span class="cursor-pointer ml-4 inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800 hover:bg-pink-200 hover:text-pink-900 hover:ring-pink-300 hover:ring-2">
                    {!userDetails.needed &&
                    userDetails.weight !== undefined &&
                    userDetails.age !== undefined &&
                    userDetails.portion !== undefined
                      ? calculateServings(
                          userDetails.age,
                          userDetails.weight,
                          userDetails.portion,
                          fish
                        )
                      : "? servings per week"}
                  </span>
                </div>
              </div>
              <div class="pt-5">
                <dl class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Protien</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {fish.protein}
                      <span class="text-xs text-gray-700">g per 100g</span>
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">PCB</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {fish.pcb} <span class="text-xs text-gray-700">ppm</span>
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">
                      Omega 3/6 Ratio
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {fish.omega_3_ratio}
                    </dd>
                  </div>
                  <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Mercury</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                      {fish.mercury}{" "}
                      <span class="text-xs text-gray-700">ppm</span>
                    </dd>
                  </div>
                </dl>
              </div>
              <span
                class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-pink-400"
                aria-hidden="true"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
});
