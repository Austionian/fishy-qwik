import { component$, useSignal } from "@builder.io/qwik";
import { calculateServings } from "~/helpers";
import { LAKES } from "~/constants/lakes";
import { dataPoints } from "~/constants/dataPoints";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";
import type Recipe from "~/types/Recipe";

import DataModal from "../data-modal/data-modal";

type FishData = {
  fish_data: Fish;
  recipe_data: Recipe[];
};
type Props = {
  fishData: FishData;
  userDetails: UserDetails;
};

export default component$(({ fishData, userDetails }: Props) => {
  const showProtein = useSignal(false);
  const showMercury = useSignal(false);
  const showPcb = useSignal(false);
  const showOmega3 = useSignal(false);

  function getSvg(lake: string) {
    for (let i = 0; i < LAKES.length; i++) {
      if (lake === LAKES[i].name) {
        return LAKES[i].svg_large;
      }
    }
  }
  const lake_svg = getSvg(fishData.fish_data.lake || "All");
  return (
    <div class="min-h-full">
      {showPcb.value && (
        <DataModal
          showDataModal={showPcb}
          fishData={fishData.fish_data}
          dataPoint={dataPoints.pcb}
        />
      )}
      {showOmega3.value && (
        <DataModal
          showDataModal={showOmega3}
          fishData={fishData.fish_data}
          dataPoint={dataPoints.omega_3_ratio}
        />
      )}
      {showMercury.value && (
        <DataModal
          showDataModal={showMercury}
          fishData={fishData.fish_data}
          dataPoint={dataPoints.mercury}
        />
      )}
      {showProtein.value && (
        <DataModal
          showDataModal={showProtein}
          fishData={fishData.fish_data}
          dataPoint={dataPoints.protein}
        />
      )}
      <main class="pb-10">
        <div class="hidden mx-auto max-w-3xl sm:block md:items-center md:justify-between md:space-x-5 lg:max-w-7xl mb-6">
          <a href="/" class="hover:text-teal-500 hover:cursor-pointer">
            ‹ Back to fish
          </a>
        </div>
        <div class="mx-auto max-w-3xl md:block md:items-center md:justify-between md:space-x-5 lg:max-w-7xl mb-10">
          <div class="flex justify-center items-center flex-wrap space-x-5">
            <div class="bg-teal-500/20 dark:bg-white/5 dark:ring-1 dark:ring-gray-800 p-2 shadow-sm rounded mb-4 w-screen flex justify-center">
              {fishData.fish_data.woodland_fish_image ? (
                <img
                  class="h-40 sm:w-auto sm:h-[300px] text-center"
                  src={`/images/${fishData.fish_data.woodland_fish_image}`}
                />
              ) : (
                <img
                  class="h-40 sm:w-auto sm:h-[300px] text-center"
                  src={`/images/${fishData.fish_data.fish_image}`}
                />
              )}
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center">
              <h1 class="text-5xl font-extralight flex items-center dark:text-white dark:fill-white">
                <span dangerouslySetInnerHTML={lake_svg} />
                {fishData.fish_data.anishinaabe_name ? (
                  <>
                    {fishData.fish_data.anishinaabe_name}
                    <span class="text-xs pl-2 self-end mb-1">
                      [{fishData.fish_data.name}]
                    </span>
                  </>
                ) : (
                  fishData.fish_data.name
                )}
              </h1>
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
        </div>

        <div class="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div class="space-y-6 lg:col-span-2 lg:col-start-1">
            <section aria-labelledby="fish information">
              <div class="bg-white dark:bg-gray-900/80 shadow sm:rounded-lg dark:ring-gray-800 dark:ring-1">
                <div class="px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-3 gap-x-4 gap-y-8">
                    <div class="sm:col-span-1">
                      <div class="flex items-center">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-200">
                          Protein
                        </dt>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          class="h-5 cursor-pointer w-5 hover:fill-teal-500 dark:fill-white"
                          onClick$={() => (showProtein.value = true)}
                        >
                          <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
                        </svg>
                      </div>
                      <dd class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                        {fishData.fish_data.protein.toFixed(3)}
                        <span class="text-xs text-gray-700 dark:text-gray-300">
                          g per 100g
                        </span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <div class="flex items-center">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-200">
                          Omega 3/6 ratio
                        </dt>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          class="h-5 cursor-pointer w-5 hover:fill-teal-500 dark:fill-white"
                          onClick$={() => (showOmega3.value = true)}
                        >
                          <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
                        </svg>
                      </div>
                      <dd class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                        {fishData.fish_data.omega_3_ratio.toFixed(3)}{" "}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <div class="flex items-center">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-200">
                          Servings
                        </dt>
                      </div>
                      <dd class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                        {!userDetails.needed &&
                        userDetails.weight !== undefined &&
                        userDetails.age !== undefined &&
                        userDetails.sex !== undefined &&
                        userDetails.portion !== undefined
                          ? calculateServings(
                              userDetails.age,
                              userDetails.weight,
                              userDetails.portion,
                              userDetails.sex,
                              userDetails.plan_to_get_pregnant || "",
                              fishData.fish_data
                            )
                          : "? servings per week"}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div class="border-t border-gray-200 px-4 py-8 sm:px-6">
                  <div class="sm:col-span-2">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">
                      About
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                      {fishData.fish_data.about}
                    </dd>
                  </div>
                  <dl class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8">
                    <div class="sm:col-span-1">
                      <div class="flex items-center">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-200">
                          Mercury
                        </dt>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          class="h-5 cursor-pointer w-5 hover:fill-teal-500 dark:fill-white"
                          onClick$={() => (showMercury.value = true)}
                        >
                          <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
                        </svg>
                      </div>
                      <dd class="mt-1 text-gray-900 dark:text-gray-100">
                        {fishData.fish_data.mercury.toFixed(3)}
                        <span class="text-xs text-gray-700 dark:text-gray-300">
                          {" "}
                          ppm
                        </span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <div class="flex items-center">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-200">
                          PCB
                        </dt>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100pt"
                          height="100pt"
                          version="1.1"
                          viewBox="0 0 100 100"
                          class="h-5 cursor-pointer w-5 hover:fill-teal-500 dark:fill-white"
                          onClick$={() => (showPcb.value = true)}
                        >
                          <path d="m50 16.918c-18.242 0-33.086 14.84-33.086 33.082s14.844 33.082 33.086 33.082 33.086-14.84 33.086-33.082-14.844-33.082-33.086-33.082zm0 62.164c-16.035 0-29.086-13.047-29.086-29.082s13.051-29.082 29.086-29.082 29.086 13.047 29.086 29.082-13.051 29.082-29.086 29.082zm-2-39.832h4v-6.168h-4zm0 27.668h4v-23.418h-4z" />
                        </svg>
                      </div>
                      <dd class="mt-1 text-gray-900 dark:text-gray-100">
                        {fishData.fish_data.pcb.toFixed(3)}{" "}
                        <span class="text-xs text-gray-700 dark:text-gray-300">
                          ppm
                        </span>
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
            <div class="bg-white dark:bg-gray-900/80 dark:ring-gray-800 dark:ring-1 px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="recipes-title"
                class="text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                Recipes
              </h2>

              <div class="mt-6 flow-root">
                <ul role="list" class="-mb-8">
                  {fishData.recipe_data.map((recipe, i) => (
                    <li key={i} class="group">
                      <a href={`/recipe/${recipe.id}/`}>
                        <div class="relative pb-8">
                          <div class="relative flex items-center space-x-3 text-gray-500 dark:text-gray-300 rounded-full p-1 group-hover:bg-gray-100 dark:group-hover:bg-slate-700 group-hover:text-black dark:group-hover:text-white">
                            <div class="flex items-center">
                              <span class="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-slate-700 flex items-center justify-center">
                                <svg
                                  width="100pt"
                                  height="100pt"
                                  version="1.1"
                                  viewBox="0 0 100 100"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6 flex-none fill-gray-900 dark:fill-gray-100 group-hover:fill-black dark:group-hover:fill-white"
                                >
                                  <g>
                                    <path d="m38.301 90.5c-1.6992 0-3-1.3008-3-3v-47.602c-4.3984-1.8984-7.3984-8-7.3984-14.801 0-8.6016 4.6992-15.5 10.398-15.5s10.398 7 10.398 15.5c0 6.8984-3 12.898-7.3984 14.801v47.602c0 1.6016-1.4023 3-3 3zm0-80c-5.1992 0-9.3984 6.5-9.3984 14.5 0 6.6016 2.8984 12.398 7.1016 14l0.30078 0.10156v48.199c0 1.1016 0.89844 2 2 2 1.1016 0 2-0.89844 2-2l-0.003907-48.102 0.30078-0.10156c4.1992-1.6016 7.1016-7.3984 7.1016-14-0.003906-8.0977-4.2031-14.598-9.4023-14.598z" />
                                    <path d="m62.602 90.5c-1.6992 0-3-1.3008-3-3v-47.602c-4.3984-1.8984-7.5-8-7.5-14.898 0-0.60156 0.10156-13 0.10156-13 0-0.69922 0.30078-1.3984 0.80078-1.8984s1.1992-0.69922 1.8984-0.69922c1 0.10156 1.8008 1 1.8008 2v16.301c0 0.69922 0.39844 1.1992 1 1.3984l-0.003906-17.602c0-1.1016 0.89844-2 2-2h0.39844c1.1016 0 2 0.89844 2 2v17.301c0 0.30078 0.19922 0.5 0.5 0.5 0.30078 0 0.5-0.19922 0.5-0.5l0.003906-17.301c0-1.1016 0.89844-2 2-2h0.39844c1.1016 0 2 0.89844 2 2v17.699c0.60156-0.19922 1-0.80078 1-1.3984v-16.301c0-1 0.80078-1.8984 1.8008-2 0.69922-0.10156 1.3984 0.19922 1.8984 0.69922s0.80078 1.1992 0.80078 1.8984c0 0 0.10156 12.398 0.10156 13 0 6.8984-3.1016 12.898-7.5 14.898v47.602c0 1.5039-1.4023 2.9023-3 2.9023zm-7.9023-80c-0.39844 0-0.80078 0.10156-1.1016 0.39844-0.30078 0.30078-0.5 0.69922-0.5 1.1016 0 0-0.10156 12.398-0.10156 13 0 6.6016 3 12.398 7.1992 14.102l0.30078 0.10156v48.199c0 1.1016 0.89844 2 2 2 1.1016 0 2-0.89844 2-2l0.003906-48.203 0.30078-0.10156c4.1992-1.6016 7.1992-7.3984 7.1992-14.102 0-0.60156-0.10156-12.898-0.10156-12.898 0-0.39844-0.19922-0.80078-0.5-1.1016-0.30078-0.30078-0.80078-0.39844-1.1992-0.39844-0.5 0-0.89844 0.5-0.89844 1v16.301c0 1.3984-1.1016 2.5-2.5 2.5h-0.5v-18.898c0-0.60156-0.5-1-1-1h-0.39844c-0.60156 0-1 0.5-1 1v17.301c0 0.80078-0.69922 1.5-1.5 1.5-0.80078 0-1.5-0.69922-1.5-1.5l-0.003906-17.301c0-0.60156-0.5-1-1-1h-0.39844c-0.60156 0-1 0.5-1 1v18.801h-0.5c-1.3984 0-2.5-1.1016-2.5-2.5v-16.301c0-0.5-0.39844-1-0.89844-1h0.097657z" />
                                  </g>
                                </svg>
                              </span>
                            </div>
                            <div class="flex min-w-0 flex-1 justify-between space-x-4">
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
