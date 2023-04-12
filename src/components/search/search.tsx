import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type Fish from "~/types/Fish";
import LAKES from "~/constants/lakes";

type Props = {
  showSearch: { value: boolean };
};

type Recipe = {
  recipe_id: string;
  recipe_name: string;
};

export default component$<Props>(({ showSearch }) => {
  const modalRef = useSignal<Element>();
  const inputRef = useSignal<Element>();
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

  useVisibleTask$(async () => {
    if (
      !window.localStorage.getItem("fish") ||
      !window.localStorage.getItem("recipes") ||
      typeof window.localStorage.getItem("fish") === undefined ||
      typeof window.localStorage.getItem("recipes") === undefined
    ) {
      const res = await fetch("/api/search/");
      const data = await res.json();
      const fish = data.data.fish_result;
      const recipes = data.data.recipe_result;

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
      <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity z-1"></div>
      <div
        class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        ref={modalRef}
      >
        <div class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
          <div class="relative">
            <svg
              class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40"
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
              class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              autoFocus
              bind:value={search}
            />
          </div>

          <ul class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto">
            {filteredFish.length > 0 && (
              <li class="p-2">
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900">
                  Fish
                </h2>
                <ul class="text-sm text-gray-700">
                  {fishResults.value?.length > 0 &&
                    filteredFish.map((fish, i) => (
                      <a href={"/fish/" + fish.fish_id + "/"} key={i}>
                        <li
                          class="group flex cursor-default select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5 hover:text-gray-900 focus:bg-gray-900 focus:bg-opacity-5 focus:text-gray-900"
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
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900">
                  Recipes
                </h2>
                <ul class="text-sm text-gray-700">
                  {filteredRecipes.map((recipe, i) => (
                    <a href={"/recipe/" + recipe.recipe_id + "/"} key={i}>
                      <li
                        class="group flex cursor-default select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5 hover:text-gray-900 focus:bg-gray-900 focus:bg-opacity-5 focus:text-gray-900"
                        tabIndex={0}
                      >
                        <svg
                          class="h-6 w-6 flex-none text-gray-900 text-opacity-40"
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
                <h2 class="mb-2 mt-4 px-3 text-sm font-semibold text-gray-900">
                  Lakes
                </h2>
                <ul class="text-sm text-gray-700">
                  {filteredLakes.map((lake, i) => (
                    <a href={`/lake/${lake.name}/`} key={i}>
                      <li
                        class="group flex cursor-default select-none items-center rounded-md px-3 py-2 hover:bg-gray-900 hover:bg-opacity-5 hover:text-gray-900 focus:bg-gray-900 focus:bg-opacity-5 focus:text-gray-900"
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="100pt"
                  height="100pt"
                  version="1.1"
                  viewBox="0 0 100 100"
                  class="mx-auto h-12 w-12 text-gray-900 text-opacity-40"
                >
                  <path d="m29.098 56.922c-2.7461 0.15234-2.5938 3.9258 0 4.0078 2.7461-0.15234 2.5938-3.9297 0-4.0078zm0 2.6406c-0.89844-0.054688-0.80469-1.2539 0-1.2734 0.89844 0.054688 0.80859 1.2539 0 1.2734zm61.078 2.3281c-0.91406-5 0.59375-10.469 4.3828-16.414 0.60156-0.80859 0.76953-1.6641-0.64844-1.5312-13.777 4.6875-6.4414 23.859-25.84 10.691 2.0977-0.98828 5.375-1.2422 5.7109-1.2617 2.8398-1.0195-3.7891-3.3828-4.9102-3.4688-3.2305-0.67969-6.6367-0.16797-8.0664 0.21484-3.2734-1.625-6.7266-2.5352-10.578-2.7812 1.1328-2.918 3.2773-4.0039 3.0195-4.6211-0.11719-1.0469-2.4062-0.39453-2.9062-0.44141-5.4961 0.62891-10.141 3.8711-12.66 6.7227-5.6289 1.8477-10.633 5.0938-13.992 7.8477-4.5195 3.7695-3.2188 2.582 0.45703 6.3555-2.043 0.69531-4.2891 0.82812-3.0273 2.1719 4.5117 4.8359 11.441 9.0664 16.508 10.695 6.1211 6.9609 15.68 7.6562 15.613 6.4297 0.019531-1.0312-2.7148-2.9727-3.043-4.8047 3.8984-0.28906 7.3906-1.2773 10.723-3.0078 2.0273 0.57812 5.9141 0.66797 7.7656 0.22266 1.5859-0.13672 7.9648-2.6133 5.043-3.5117-0.54297-0.039063-3.6055-0.30469-5.6367-1.25 3.0742-2.1641 10.559-6.3359 14.113-3.75 2.0938 1.8359 3.1484 7.125 7.5938 10.84 0.96094 1 5.6445 3.625 5.1484 1.3477-2.8633-4.4883-6.0195-10.98-4.7695-16.695zm-24.977-10.949c1.7539-0.019531 4.1445 0.21875 6.4492 1.3086-1.4883 0.23438-3.4688 0.68359-4.8516 1.5234-1.3086-0.89063-2.6445-1.793-4.0938-2.6328 0.6875-0.10156 1.5391-0.1875 2.4961-0.19922zm-22.898-4.1562c1.9297-1.3086 4.9062-2.8398 8.6445-3.1992-0.79297 0.95312-1.7656 2.3281-2.1211 3.6875-2.7617-0.070313-5.5664 0.23828-8.3711 0.92578 0.51172-0.44141 1.1328-0.92578 1.8477-1.4141zm8.6445 34.754c-4.8828-0.59766-7.6562-2.3047-10.547-4.6602 2.8125 0.69922 5.5898 0.98438 8.4023 0.88281 0.33594 1.3945 1.332 2.8047 2.1445 3.7773zm20.703-9.0117c-3.2617 1.457-5.9883 1.4688-8.8711 1.1172 1.4023-0.83594 2.7383-1.75 4.0352-2.6328 1.3828 0.83203 3.3516 1.2812 4.8359 1.5156zm17.168 1.7344c-3.8086-4.7188-3.6016-7.1289-5.4609-8.668-4.4883-3.9648-13.543 1.5859-17.09 4.1367-10.98 8.3203-22.734 8.7461-34.465 2.2031 4.4805-1.0703 7.3359-3.7656 6.7266-8.0352-0.15234-1.5586-1.2852-3.3789-0.99219-4.7539 1.0938-5.5703 12.969-5.3789 18.066-3.7812 3.5781 1.0156 4.2852 1.6992 7.0273 3.1562 4.2617 2.1914 7.0898 3.1719 9.9062 3.8477 1.6992 0.36719 5.2852 0.98047 5.4219 0.082031 0.21875-0.73438-0.46484-1-0.92578-0.91797-9.6484-0.21875-16.066-6.7188-22.074-7.7383-5.6367-1.3633-12.934-1.0859-16.617 1.7227-4.3359 3.5391-0.96484 6.7891-1.1094 9.3398 0.15234 4.4219-4.8789 5.7109-7.2148 6.0078-2.9961-1.8438-6.2656-4.7188-7.3086-5.8086 5.4375-1.4961 3.8359-1.2344-0.27344-5.2969 8.8594-8.2812 22.684-14.359 35.906-9.2734 10.977 4.9062 21.359 18 27.422 3.3398 1.6875-3.3711 4.5625-6.9023 6.9531-7.9922-2.7031 4.5547-5.0195 10.656-3.9062 15.914-1.125 5.2344 1.2383 11.293 3.9062 15.82-1.3008-0.64453-2.6055-1.75-3.8984-3.3047zm-74.855-10.035s1.0117-0.23437 1.8164-0.90625c0.42969 4.8086-9.1562 5.4609-9.3359 0.57031-0.375-4.4648 3.0391-9.9375 3.6367-12 1.8477-0.26953 2.2266-2.5586 0.86328-3.5039 0.51172-1.8945 1.4258-6.2422 0.38281-8.9688-0.71875-2.0625-1.8828-3.8125-2.0781-5.793-0.097656-5.7227 4.7695-4.6445 2.3828-12.516-0.51172-2.3398 0.078125-4.0039-0.75781-4.0898-1.8945-0.35938 0.37891 7.418 0.19922 7.1328 0.14844 0.98828 0.046876 1.8633-0.69922 3.2344-6.5352 9.4102 2.9766 8.9922-0.57812 20.645-1.9805 0.089844-2.5078 2.5234-1.0625 3.5234-2.3711 5.7227-5.8359 12.23-2.0508 15.777 1.3242 1.1172 3.2422 1.3984 5.4297 1.1719 5.7695-0.625 6.0977-6.1523 3.4531-9.9961 0.17188 1.6914 0.20312 3.9883-1.6016 5.7188zm-4.5391-14.961c-0.38672 0.90234 0.91406 1.3242 1.1445 0.35156 0.46484 2.082-2.6875 0.96875-1.1445-0.35156z" />
                </svg>
                <p class="mt-4 text-sm text-gray-900">
                  We couldn't find anything with that term. Please try again.
                </p>
              </div>
            )}

          <ul class="max-h-96 overflow-y-auto p-2 text-sm text-gray-700">
            <li class="group flex cursor-default select-none items-center rounded-md px-3 py-2">
              <svg
                class="h-6 w-6 flex-none text-gray-900 text-opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
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
