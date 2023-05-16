import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

export const onRequest: RequestHandler = async ({
  cookie,
  request,
  redirect,
}) => {
  if (!cookie.get("fish-login")) {
    throw redirect(302, `/login/?redirect=${request.url}`);
  }
};

export const useUserObject = routeLoader$(({ cookie }) => {
  return {
    image: cookie.get("image")?.value,
    admin: cookie.get("admin")?.value,
  };
});

export default component$(() => {
  const user = useUserObject();
  return (
    <div class="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header image={user.value.image} admin={user.value.admin} />

      <main class="pt-10 min-h-full">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <Footer />
    </div>
  );
});
