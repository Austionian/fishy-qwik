import { component$, Slot, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

export const onRequest: RequestHandler = async ({
  cookie,
  request,
  redirect,
}) => {
  if (!cookie.get("fish-login")) {
    throw redirect(302, `/login/?redirect=${request.url}`);
  }
};

//
export default component$(() => {
  const userMenu = useSignal(false);
  const mobileMenu = useSignal(false);
  return (
    <div class="min-h-full bg-gray-100 ">
      <div class="bg-gradient-to-r from-cyan-700 to-purple-700 pb-32">
        <nav class="border-b border-indigo-300 border-opacity-25 bg-gradient-to-r from-cyan-700 to-purple-700 lg:border-none">
          <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              <div class="flex items-center px-2 lg:px-0">
                <div class="flex-shrink-0">
                  <a href="/">
                    <h1 class="font-bold text-white text-3xl">Gigiigoo App</h1>
                  </a>
                </div>
                <div class="hidden lg:ml-10 lg:block">
                  <div class="flex space-x-4">
                    <a
                      href="#"
                      class="bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium"
                      aria-current="page"
                    >
                      Fish
                    </a>

                    <a
                      href="#"
                      class="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                    >
                      Lakes
                    </a>

                    <a
                      href="#"
                      class="text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                    >
                      Recipes
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <div class="w-full max-w-lg lg:max-w-xs">
                  <label for="search" class="sr-only">
                    Search
                  </label>
                  <div class="relative text-gray-400 focus-within:text-gray-600">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        class="h-5 w-5"
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
                    </div>
                    <input
                      id="search"
                      class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div class="flex lg:hidden">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick$={() => (mobileMenu.value = !mobileMenu.value)}
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    class="hidden h-6 w-6"
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
              <div class="hidden lg:ml-4 lg:block">
                <div class="flex items-center">
                  <div class="relative ml-3 flex-shrink-0">
                    <div>
                      <button
                        type="button"
                        class="flex h-8 w-8 rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick$={() => (userMenu.value = !userMenu.value)}
                      >
                        <span class="sr-only">Open user menu</span>
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                        >
                          <title />
                          <g
                            data-name="user people person users man"
                            id="user_people_person_users_man"
                          >
                            <path d="M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z" />
                            <path d="M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z" />
                          </g>
                        </svg>
                      </button>
                    </div>

                    {userMenu.value ? (
                      <div
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={parseInt("-1")}
                      >
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={parseInt("-1")}
                          id="user-menu-item-0"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={parseInt("-1")}
                          id="user-menu-item-2"
                        >
                          Sign out
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {mobileMenu.value ? (
            <div class="lg:hidden" id="mobile-menu">
              <div class="space-y-1 px-2 pb-3 pt-2">
                <a
                  href="#"
                  class="bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                  aria-current="page"
                >
                  Fish
                </a>

                <a
                  href="#"
                  class="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                >
                  Lakes
                </a>

                <a
                  href="#"
                  class="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                >
                  Projects
                </a>
              </div>
              <div class="border-t border-indigo-700 pb-3 pt-4">
                <div class="flex items-center px-5">
                  <div class="flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <div class="text-base font-medium text-white">Tom Cook</div>
                    <div class="text-sm font-medium text-indigo-300">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
                  <a
                    href="#"
                    class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                  >
                    Your Profile
                  </a>

                  <a
                    href="#"
                    class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </nav>
        <header class="py-10">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-white">Fish</h1>
          </div>
        </header>
      </div>

      <main class="-mt-32">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <Footer />
    </div>
  );
});
