import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getFetchDetails } from "~/helpers";

type Data = {
  number_of_registered_users: number;
  user_data: UserData[];
};

type UserData = {
  email: string;
  created_at?: string;
  latest_login?: string;
};

export const useGetData = routeLoader$<Data>(async ({ env, cookie, query }) => {
  let user_id = query.get("user_id");
  if (!user_id) {
    user_id = cookie.get("user_id")?.value || "";
  }
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/admin/analytics/`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      cookie: `user_id=${user_id}`,
    },
  });
  cookie.set("user_id", user_id);
  return res.json();
});

export default component$(() => {
  dayjs.extend(relativeTime);
  const data = useGetData();
  return (
    <div class="font-flow">
      {/* <div class="fixed inset-0 flex">
      <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-900/80"></div>

          <div class="relative mr-16 flex w-full max-w-xs flex-1">
            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button type="button" class="-m-2.5 p-2.5">
                <span class="sr-only">Close sidebar</span>
                <svg
                  class="h-6 w-6 text-black dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
              <div class="flex h-16 shrink-0 items-center"></div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
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
                          Projects
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="bg-gray-800 text-black dark:text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
                            />
                          </svg>
                          Deployments
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          Activity
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                            />
                          </svg>
                          Domains
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                            />
                          </svg>
                          Usage
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">
                      Your teams
                    </div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                            P
                          </span>
                          <span class="truncate">Planetaria</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                            P
                          </span>
                          <span class="truncate">Protocol</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                            T
                          </span>
                          <span class="truncate">Tailwind Labs</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="-mx-6 mt-auto">
                    <a
                      href="#"
                      class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black dark:text-white hover:bg-gray-800"
                    >
                      <span class="sr-only">Your profile</span>
                      <span aria-hidden="true">Tom Cook</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      */}

      {/*<div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <div class="flex h-16 shrink-0 items-center"></div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
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
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="bg-gray-800 text-black dark:text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
                        />
                      </svg>
                      Deployments
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      Activity
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                      Domains
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                        />
                      </svg>
                      Usage
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <svg
                        class="h-6 w-6 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <div class="text-xs font-semibold leading-6 text-gray-600 dark:text-gray-400">
                  Your teams
                </div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                        P
                      </span>
                      <span class="truncate">Planetaria</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                        P
                      </span>
                      <span class="truncate">Protocol</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-600 dark:text-gray-400 group-hover:text-white">
                        T
                      </span>
                      <span class="truncate">Tailwind Labs</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="-mx-6 mt-auto">
                <a
                  href="#"
                  class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black dark:text-white hover:bg-gray-800"
                >
                  <span class="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>*/}

      {/*<div class="xl:pl-72">*/}
      <div>
        <main>
          <header>
            <nav class="flex overflow-x-auto border-b border-black/10 dark:border-white/10 py-4">
              <ul
                role="list"
                class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 sm:px-6 lg:px-8"
              >
                <li>
                  <a href="#" class="text-teal-400">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" class="">
                    Activity
                  </a>
                </li>
                <li>
                  <a href="#" class="">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" class="">
                    Collaborators
                  </a>
                </li>
                <li>
                  <a href="#" class="">
                    Notifications
                  </a>
                </li>
              </ul>
            </nav>

            <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-500/5 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <div>
                <div class="flex items-center gap-x-3">
                  <div class="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                    <div class="h-2 w-2 rounded-full bg-current"></div>
                  </div>
                  <h1 class="flex gap-x-3 text-base leading-7">
                    <span class="font-semibold text-black dark:text-white">
                      Planetaria
                    </span>
                    <span class="text-gray-600">/</span>
                    <span class="font-semibold text-black dark:text-white">
                      mobile-api
                    </span>
                  </h1>
                </div>
                <p class="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-400">
                  Deploys from GitHub via main branch
                </p>
              </div>
              <div class="order-first flex-none rounded-full bg-teal-400/10 px-2 py-1 text-xs font-medium text-teal-400 ring-1 ring-inset ring-teal-400/30 sm:order-none">
                Production
              </div>
            </div>

            <div class="grid grid-cols-1 bg-gray-500/5 dark:bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Registered Users
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {data.value.number_of_registered_users}
                  </span>
                </p>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Current Active Users
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {
                      data.value.user_data.filter(
                        (user) =>
                          dayjs(user.latest_login).diff(
                            new Date(),
                            "d",
                            true
                          ) >= -14
                      ).length
                    }
                  </span>
                </p>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 lg:border-l">
                <p class="font-mono text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  New Users in the Last Month
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {
                      data.value.user_data.filter(
                        (user) =>
                          dayjs(user.created_at).diff(new Date(), "d", true) >=
                          -30
                      ).length
                    }
                  </span>
                </p>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
                <p class="text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Success rate
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="text-4xl font-semibold tracking-tight text-black dark:text-white">
                    98.5%
                  </span>
                </p>
              </div>
            </div>
          </header>

          <div class="border-t border-black/10 dark:border-white/10 pt-11 overflow-x-auto">
            <h2 class="font-sans px-4 text-base font-semibold leading-7 text-black dark:text-white sm:px-6 lg:px-8">
              Users
            </h2>
            <table class="mt-6 w-full whitespace-nowrap text-left">
              <colgroup>
                <col class="w-full sm:w-4/12" />
                <col class="lg:w-4/12" />
                <col class="lg:w-2/12" />
                <col class="lg:w-1/12" />
                <col class="lg:w-1/12" />
              </colgroup>
              <thead class="border-b boder-black/10 dark:border-white/10 text-sm leading-6 text-black dark:text-white">
                <tr>
                  <th
                    scope="col"
                    class="font-sans py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="font-mono py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="font-mono hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Registered
                  </th>
                  <th
                    scope="col"
                    class="font-mono hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Latest Login
                  </th>
                </tr>
              </thead>
              <tbody class="font-mono divide-y divide-black/5 dark:divide-white/5">
                {data.value.user_data.map((user) => {
                  return (
                    <tr key={user.email}>
                      <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div class="flex items-center gap-x-4">
                          <div class="truncate text-sm font-medium leading-6 text-black dark:text-white">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                          <time
                            class="text-gray-400 sm:hidden"
                            dateTime="2023-01-23T11:00"
                          >
                            {dayjs(user.latest_login).fromNow()}
                          </time>
                          {dayjs(user.latest_login).diff(
                            new Date(),
                            "d",
                            true
                          ) >= -14 ? (
                            <>
                              <div class="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
                                <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                              </div>
                              <div class="hidden text-black dark:text-white sm:block">
                                Active
                              </div>
                            </>
                          ) : (
                            <>
                              <div class="flex-none rounded-full p-1 text-yellow-400 bg-yellow-400/10">
                                <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                              </div>
                              <div class="hidden text-black dark:text-white sm:block">
                                Inactive
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                      <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-600 dark:text-gray-400 md:table-cell lg:pr-20">
                        {dayjs(user.created_at).format("MMM D, YYYY")}
                      </td>
                      <td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-600 dark:text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        <time dateTime="2023-01-23T11:00">
                          {dayjs(user.latest_login).fromNow()}
                        </time>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Fishy Analytics",
  meta: [
    {
      name: "description",
      content: "An analytics dashboard for the MCW fish app.",
    },
  ],
};
