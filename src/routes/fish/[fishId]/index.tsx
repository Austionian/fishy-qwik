import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { calculateServings } from "~/helpers";
import getAPIKey from "~/helpers/getAPIKey";
import type Fish from "~/types/Fish";
import type UserDetails from "~/types/UserDetails";

export const useFishData = routeLoader$<Fish>(async ({ env, params }) => {
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
          <div class="flex items-center flex-wrap space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                {fishData.value.woodland_fish_image ? (
                  <img
                    class="h-56"
                    src={`/images/${fishData.value.woodland_fish_image}`}
                  />
                ) : (
                  <img
                    class="h-56"
                    src={`/images/${fishData.value.fish_image}`}
                  />
                )}
              </div>
            </div>
            <div>
              <h1 class="text-4xl font-bold">
                {fishData.value.anishinaabe_name ? (
                  <>
                    {fishData.value.anishinaabe_name}
                    <span class="text-xs pl-2">[{fishData.value.name}]</span>
                  </>
                ) : (
                  fishData.value.name
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
                          fishData.value
                        )
                      : "? servings per week"}
                  </span>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Protien</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.protein}
                        <span class="text-xs text-gray-700">g per 100g</span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">PCB</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.pcb}{" "}
                        <span class="text-xs text-gray-700">ppm</span>
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Omega 3/6 Ratio
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.omega_3_ratio}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Mercury</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {fishData.value.mercury}{" "}
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
                  <li>
                    <div class="relative pb-8">
                      <span
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                            <svg
                              class="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                            </svg>
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              Applied to{" "}
                              <a href="#" class="font-medium text-gray-900">
                                Front End Developer
                              </a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime="2020-09-20">Sep 20</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="relative pb-8">
                      <span
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              class="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                            </svg>
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              Advanced to phone screening by{" "}
                              <a href="#" class="font-medium text-gray-900">
                                Bethany Blake
                              </a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime="2020-09-22">Sep 22</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="relative pb-8">
                      <span
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              class="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              Completed phone screening with{" "}
                              <a href="#" class="font-medium text-gray-900">
                                Martha Gardner
                              </a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime="2020-09-28">Sep 28</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="relative pb-8">
                      <span
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              class="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                            </svg>
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              Advanced to interview by{" "}
                              <a href="#" class="font-medium text-gray-900">
                                Bethany Blake
                              </a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime="2020-09-30">Sep 30</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="relative pb-8">
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <svg
                              class="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              Completed interview with{" "}
                              <a href="#" class="font-medium text-gray-900">
                                Katherine Snyder
                              </a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime="2020-10-04">Oct 4</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6 flex flex-col justify-stretch">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Advance to offer
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Fish Details",
  meta: [
    {
      name: "description",
      content: "Learn the nutritional details of a specific fish",
    },
  ],
};
