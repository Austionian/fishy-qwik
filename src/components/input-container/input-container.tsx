import { component$, Slot } from "@builder.io/qwik";

export default component$(() => (
  <div class="space-y-5">
    <div class="relative flex items-start">
      <div class="ml-1 text-sm leading-6 w-full">
        <Slot />
      </div>
    </div>
  </div>
));
