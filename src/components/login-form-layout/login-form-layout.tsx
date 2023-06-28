import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-900 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <h1 class="my-6 text-center text-5xl font-bold tracking-tight dark:text-gray-100 text-gray-900">
          Gigiigoo
        </h1>
        <Slot />
      </div>
    </div>
  </div>
));
