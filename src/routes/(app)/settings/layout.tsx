import { component$, Slot } from "@builder.io/qwik";
import SettingsAside from "~/components/settings-aside/settings-aside";

export default component$(() => (
  <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        <SettingsAside />
        <Slot />
      </div>
    </div>
  </div>
));
