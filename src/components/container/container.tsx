import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-full">
    <div class="space-y-6 w-full">
      <div class="bg-white dark:bg-gray-900/80 shadow sm:rounded-lg dark:ring-1 dark:ring-white/10">
        <Slot />
      </div>
    </div>
  </div>
));
