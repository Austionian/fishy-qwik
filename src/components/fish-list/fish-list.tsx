import { component$ } from "@builder.io/qwik";
import { classNames, calculateServings } from "~/helpers";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

interface Props {
  fishData: Fish[];
  userDetails: UserDetails;
}

export default component$(({ fishData, userDetails }: Props) => (
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
                <span class="ml-4 inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800">
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
));
