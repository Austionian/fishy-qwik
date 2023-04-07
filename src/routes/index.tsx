import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";

export const useFishData = routeLoader$<Fish[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs?lake=Store",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  return data.map((fish: Fish) => ({
    id: fish.id,
    fish_id: fish.fish_id,
    name: fish.name,
    anishinaabe_name: fish.anishinaabe_name || "",
    fish_image: fish.fish_image,
  }));
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default component$(() => {
  const fishData = useFishData();

  return (
    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {fishData.value.map((fish, i) => {
        return (
          <div
            key={i}
            class={classNames(
              i === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
              i === 1 ? "sm:rounded-tr-lg" : "",
              i === fishData.value.length - 2 ? "sm:rounded-bl-lg" : "",
              i === fishData.value.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <a href={"/fish/" + fish.fish_id + "/"}>
              <div>
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
                <div>
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                    ? servings per week
                  </span>
                </div>
              </div>
              <span
                class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
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
  );
});

export const head: DocumentHead = {
  title: "Gigiigoo App",
  meta: [
    {
      name: "description",
      content:
        "Learn healthy, personalized fish portions and nutritional contents",
    },
  ],
};
