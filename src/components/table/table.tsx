import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle bg-white dark:bg-gray-900/80 ring-1 ring-gray-300 dark:ring-white/10 rounded-md">
        <table class="min-w-full border-separate border-spacing-0">
          <Slot />
        </table>
      </div>
    </div>
  </div>
));
