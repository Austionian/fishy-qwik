import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="mt-36 max-w-sm m-auto">
      <div class="py-7">
        <h1 class="text-5xl text-white font-bold">Boozhoo!</h1>
      </div>
      <div class="mt-7">
        <img
          src="/images/splash.webp"
          alt="Image showing the territories covered by the 1836 Treaty."
        />
      </div>
      <div class="mt-7">
        <p class="text-white">
          For more information about CORA and these recommendations click the
          link below or click the next button to get started.
        </p>
      </div>
      <div class="mt-7">
        <a href="https://www.1836cora.org/">
          <button class="bg-teal-600 rounded p-3 min-w-full text-white font-bold">
            CORA
          </button>
        </a>
      </div>
      <div class="my-5">
        <a href="/">
          <button class="bg-teal-600 rounded p-3 min-w-full text-white font-bold">
            NEXT
          </button>
        </a>
      </div>
    </div>
  );
});
