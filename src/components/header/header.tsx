import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { globalAction$, useLocation, Form } from "@builder.io/qwik-city";
import Search from "../search/search";
import { getCookie } from "~/helpers";
import LINKS from "~/constants/links";

export const useSignOut = globalAction$(async (_, { cookie, redirect }) => {
  cookie.delete("fish-login");
  cookie.delete("email");

  throw redirect(302, "/login");
});

export default component$(() => {
  const showUserMenu = useSignal(false);
  const mobileMenu = useSignal(false);
  const showSearch = useSignal(false);
  const location = useLocation();
  const email = useSignal("");

  const signOutAction = useSignOut();

  useVisibleTask$(() => {
    email.value = getCookie("email");
  });

  return (
    <nav
      class="bg-white shadow"
      document:onKeyDown$={(e) => {
        if (e.which === 27) {
          showSearch.value = false;
          showUserMenu.value = false;
        }
        if (e.which === 75 && e.metaKey) {
          showSearch.value = !showSearch.value;
        }
      }}
    >
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex items-center px-2 lg:px-0">
            <div class="flex-shrink-0" tabIndex={0}>
              <a href="/">
                <h1 class="font-bold text-gray-800 text-3xl hover:text-teal-600">
                  Gigiigoo
                </h1>
              </a>
            </div>
            <div class="hidden lg:ml-10 lg:block">
              <div class="flex space-x-4">
                {LINKS.map((link, i) => (
                  <a
                    href={link.href}
                    key={i}
                    class={
                      (location.url.pathname === link.pathname
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-800 hover:bg-gray-100 hover:text-gray-900") +
                      " rounded-md py-2 px-3 text-sm font-medium"
                    }
                  >
                    <span tabIndex={0}>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">
                Search
              </label>
              <button
                type="button"
                class="block w-full rounded-md border-gray-100 py-5 sm:py-3.5
                    border-0 bg-white text-gray-900 ring-1 ring-inset ring-gray-300
                    pl-10 pr-3 focus:ring-2 focus:ring-gray-50 focus:ring-offset-2 
                    focus:ring-offset-teal-600 sm:text-sm sm:leading-3 relative 
                    focus-within:text-gray-600 transition ease-in-out
                    delay-50 hover:scale-105 duration-100"
                onClick$={() => (showSearch.value = !showSearch.value)}
              >
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
                <div class="flex justify-start sm:justify-between">
                  <div class="hidden sm:flex">Quick search...</div>
                  <div class="hidden sm:flex">
                    <kbd class="font-sans">⌘</kbd>
                    <kbd class="font-sans">K</kbd>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-200 hover:bg-gray-600 hover:bg-opacity-75 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick$={() => (mobileMenu.value = !mobileMenu.value)}
            >
              {!mobileMenu.value ? (
                <>
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
                </>
              ) : (
                <svg
                  class="h-6 w-6"
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
              )}
            </button>
          </div>
          <div class="hidden lg:ml-4 lg:block">
            <div class="flex items-center">
              <div class="relative ml-3 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick$={() => (showUserMenu.value = !showUserMenu.value)}
                  >
                    <span class="sr-only">Open user menu</span>
                    <span class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      <svg
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </button>
                </div>

                {showUserMenu.value ? (
                  <div
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={0}
                  >
                    <a
                      href="/settings/"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex={0}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <Form action={signOutAction}>
                      <button
                        type="submit"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        role="menuitem"
                        tabIndex={0}
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </Form>
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
            {LINKS.map((link, i) => (
              <a
                href={link.href}
                key={i}
                class={
                  (location.url.pathname === link.pathname
                    ? "bg-gray-900 text-gray-200"
                    : "text-gray-300 hover:bg-gray-700 hover:text-gray-200") +
                  " text-gray-200 block rounded-md py-2 px-3 text-base font-medium"
                }
              >
                {link.title}
              </a>
            ))}
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <span class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    class="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-200">Austin</div>
                <div class="text-sm font-medium text-gray-400">{email}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <a
                href="/settings/"
                class="text-gray-400 hover:bg-gray-700 hover:text-gray-200 block rounded-md py-2 px-3 text-base font-medium"
              >
                Your Profile
              </a>

              <Form action={signOutAction}>
                <button
                  type="submit"
                  class="w-full text-left text-gray-400 hover:bg-gray-700 hover:text-gray-200 block rounded-md py-2 px-3 text-base font-medium"
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        </div>
      ) : null}
      {showSearch.value ? <Search showSearch={showSearch} /> : null}
    </nav>
  );
});
