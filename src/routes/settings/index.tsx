import { component$ } from "@builder.io/qwik";

export default component$(() => (
  <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        <aside class="py-6 lg:col-span-3">
          <nav class="space-y-1">
            <a
              href="#"
              class="border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              <svg
                class="text-teal-500 group-hover:text-teal-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="truncate">Profile</span>
            </a>

            <a
              href="#"
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
              <span class="truncate">Account</span>
            </a>

            <a
              href="#"
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <span class="truncate">Password</span>
            </a>

            <a
              href="#"
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              <span class="truncate">Notifications</span>
            </a>

            <a
              href="#"
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              <span class="truncate">Billing</span>
            </a>

            <a
              href="#"
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <svg
                class="text-gray-400 group-hover:text-gray-500 -ml-1 mr-3 h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span class="truncate">Integrations</span>
            </a>
          </nav>
        </aside>

        <form
          class="divide-y divide-gray-200 lg:col-span-9"
          action="#"
          method="POST"
        >
          <div class="px-4 py-6 sm:p-6 lg:pb-8">
            <div>
              <h2 class="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div class="mt-6 flex flex-col lg:flex-row">
              <div class="flex-grow space-y-6">
                <div>
                  <label
                    for="username"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div class="mt-2 flex rounded-md shadow-sm">
                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                      workcation.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      value="deblewis"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div class="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      class="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:py-1.5 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>

              <div class="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                <p
                  class="text-sm font-medium leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Photo
                </p>
                <div class="mt-2 lg:hidden">
                  <div class="flex items-center">
                    <div
                      class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                      aria-hidden="true"
                    >
                      <img
                        class="h-full w-full rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80"
                        alt=""
                      />
                    </div>
                    <div class="relative ml-5">
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        class="peer absolute h-full w-full rounded-md opacity-0"
                      />
                      <label
                        for="mobile-user-photo"
                        class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                      >
                        <span>Change</span>
                        <span class="sr-only"> user photo</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="relative hidden overflow-hidden rounded-full lg:block">
                  <span class="inline-block h-40 w-40 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      class="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <label
                    for="desktop-user-photo"
                    class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                    <input
                      type="file"
                      id="desktop-user-photo"
                      name="user-photo"
                      class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-12 gap-6">
              <div class="col-span-12 sm:col-span-6">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="last-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div class="col-span-12">
                <label
                  for="url"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <label
                  for="company"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div class="divide-y divide-gray-200 pt-6">
            <div class="px-4 sm:px-6">
              <div>
                <h2 class="text-lg font-medium leading-6 text-gray-900">
                  Privacy
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                </p>
              </div>
              <ul role="list" class="mt-2 divide-y divide-gray-200">
                <li class="flex items-center justify-between py-4">
                  <div class="flex flex-col">
                    <p
                      class="text-sm font-medium leading-6 text-gray-900"
                      id="privacy-option-1-label"
                    >
                      Available to hire
                    </p>
                    <p
                      class="text-sm text-gray-500"
                      id="privacy-option-1-description"
                    >
                      Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                      lacinia.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    role="switch"
                    aria-checked="true"
                    aria-labelledby="privacy-option-1-label"
                    aria-describedby="privacy-option-1-description"
                  >
                    <span
                      aria-hidden="true"
                      class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </li>
                <li class="flex items-center justify-between py-4">
                  <div class="flex flex-col">
                    <p
                      class="text-sm font-medium leading-6 text-gray-900"
                      id="privacy-option-2-label"
                    >
                      Make account private
                    </p>
                    <p
                      class="text-sm text-gray-500"
                      id="privacy-option-2-description"
                    >
                      Pharetra morbi dui mi mattis tellus sollicitudin cursus
                      pharetra.
                    </p>
                  </div>
                  <button
                    type="button"
                    class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    role="switch"
                    aria-checked="false"
                    aria-labelledby="privacy-option-2-label"
                    aria-describedby="privacy-option-2-description"
                  >
                    <span
                      aria-hidden="true"
                      class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </li>
                <li class="flex items-center justify-between py-4">
                  <div class="flex flex-col">
                    <p
                      class="text-sm font-medium leading-6 text-gray-900"
                      id="privacy-option-3-label"
                    >
                      Allow commenting
                    </p>
                    <p
                      class="text-sm text-gray-500"
                      id="privacy-option-3-description"
                    >
                      Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                    </p>
                  </div>
                  <button
                    type="button"
                    class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    role="switch"
                    aria-checked="true"
                    aria-labelledby="privacy-option-3-label"
                    aria-describedby="privacy-option-3-description"
                  >
                    <span
                      aria-hidden="true"
                      class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </li>
                <li class="flex items-center justify-between py-4">
                  <div class="flex flex-col">
                    <p
                      class="text-sm font-medium leading-6 text-gray-900"
                      id="privacy-option-4-label"
                    >
                      Allow mentions
                    </p>
                    <p
                      class="text-sm text-gray-500"
                      id="privacy-option-4-description"
                    >
                      Adipiscing est venenatis enim molestie commodo eu gravid
                    </p>
                  </div>
                  <button
                    type="button"
                    class="bg-gray-200 relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    role="switch"
                    aria-checked="true"
                    aria-labelledby="privacy-option-4-label"
                    aria-describedby="privacy-option-4-description"
                  >
                    <span
                      aria-hidden="true"
                      class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
              <button
                type="button"
                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
));
