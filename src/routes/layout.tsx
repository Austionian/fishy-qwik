import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

export const onRequest: RequestHandler = async ({
  cookie,
  request,
  redirect,
}) => {
  if (!cookie.get("fish-login")) {
    throw redirect(302, `/login/?redirect=${request.url}`);
  }
};

export default component$(() => {
  return (
    <div class="fixed w-full h-full bg-gradient-to-r from-cyan-700 to-purple-700 overflow-auto">
      <main class="w-full md: max-w-xl m-auto">
        <Header />
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
