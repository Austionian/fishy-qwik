import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="container mx-auto sm:px-6 lg:px-8">
      <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-900 px-4 py-4 sm:py-8 shadow sm:rounded-lg sm:px-10">
          <div class="pb-2 sm:pb-4 sm:mt-8">
            <h1 class="text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 font-bold">
              Boozhoo! <em>Hello!</em>
            </h1>
          </div>
          <div class="text-left text-gray-800 dark:text-gray-200 font-extralight px-2">
            <p class="leading-6">
              Welcome to the Giigooinaan "Our Fish " App. Giigooinaan calculates
              your safe consumption levels of fish that are caught in the 1836
              Treaty territories across northern Michigan and monitored by the
              Chippewa-Ottawa Resource Authority.
            </p>
          </div>
          <div class="mt-2 sm:mt-7 flex justify-center">
            <img
              src="/images/splash.webp"
              alt="Image showing the territories covered by the 1836 Treaty."
              class="h-[351px]"
            />
          </div>
          <div class="my-5">
            <a href="/">
              <button
                class="flex w-full justify-center rounded-md bg-teal-700 px-3 py-2
                   font-semibold text-white shadow-sm hover:bg-teal-600 hover:text-gray-100
                   focus-visible:outline focus-visible:outline-2 
                   focus-visible:outline-offset-2 focus-visible:outline-teal-600
                   dark:bg-teal-500 dark:hover:bg-teal-400 dark:hover:text-black dark:text-gray-950"
              >
                NEXT
              </button>
            </a>
          </div>
          <div>
            <a
              href="https://www.1836cora.org/"
              class="text-teal-700 hover:text-teal-600 dark:text-teal-500 dark:hover:text-teal-400 font-semibold"
            >
              VISIT CORA.ORG
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
