import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import type MetaUserDetails from "~/types/MetaUserDetails";
import { GUEST } from "~/constants/constants";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

export const onRequest: RequestHandler = async ({
  cookie,
  request,
  redirect,
  platform,
}) => {
  if (import.meta.env.DEV) {
    if (!cookie.get("user_id") && !cookie.get("token")) {
      throw redirect(302, `/login/?redirect=${request.url}`);
    }
  } else {
    const user_id = cookie.get("user_id")?.value || "";
    if (user_id === "") {
      throw redirect(302, `/login/?redirect=${request.url}`);
    }
    if (user_id !== GUEST) {
      const token: string = (await platform.env?.FISHY_KV.get(user_id)) || "";
      if (!token || cookie.get("token")?.value !== token) {
        throw redirect(302, `/login/?redirect=${request.url}`);
      }
    }
  }
};

export const useUserObject = routeLoader$<MetaUserDetails>(({ cookie }) => {
  return {
    image: cookie.get("image")?.value,
    admin: Boolean(cookie.get("admin")?.value),
    email: cookie.get("email")?.value,
    firstName: cookie.get("firstName")?.value,
    lastName: cookie.get("lastName")?.value,
    user_id: cookie.get("user_id")?.value,
  };
});

export default component$(() => {
  const user = useUserObject();
  return (
    <div class="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:bg-gray-900 dark:from-gray-900/80 dark:to-gray-900/80">
      <Header user={user.value} />

      <main class="pt-10 min-h-full">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <Footer />
    </div>
  );
});
