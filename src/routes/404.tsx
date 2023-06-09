import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Error from "~/components/error/error";
import Footer from "~/components/footer/footer";
import NavBack from "~/components/nav-back/nav-back";

export default component$(() => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:bg-gray-900 dark:from-gray-900/80 dark:to-gray-900/80">
      <main class="pt-10 min-h-full">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <NavBack href={"/"} text={"home"} alwaysShow />
          <Error message={"Page not found."} />
        </div>
      </main>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "404",
    meta: [
      {
        name: "description",
        content: "404 error. Page not found.",
      },
    ],
  };
};
