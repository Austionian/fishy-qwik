import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="fixed w-full h-full bg-gray-800 overflow-auto bg-[url('/images/bg_low.webp')] bg-cover bg-center">
      <div class="fixed w-full h-full overflow-auto bg-[url('/images/bg.webp')] bg-cover bg-center">
        <div class="fixed w-full h-full overflow-auto bg-[url('/images/bg2x.webp')] bg-cover bg-center">
          <div class="text-center min-h-screen">
            <main class="w-full md: max-w-xl m-auto">
              <Slot />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
});
