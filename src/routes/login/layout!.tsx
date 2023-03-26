import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="fixed w-full h-full bg-gradient-to-r from-cyan-700 to-purple-700 overflow-auto">
      <div class="text-center min-h-screen">
        <main class="w-full md: max-w-xl m-auto">
          <Slot />
        </main>
      </div>
    </div>
  );
});
