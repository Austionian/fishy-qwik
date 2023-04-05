import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="container mx-auto sm:px-6 lg:px-8">
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
          <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            CORA
          </button>
        </a>
      </div>
      <div class="my-5">
        <a href="/">
          <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            NEXT
          </button>
        </a>
      </div>
    </div>
  );
});
