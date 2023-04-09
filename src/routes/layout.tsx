import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { type RequestHandler, server$ } from "@builder.io/qwik-city";
import { getAPIKey } from "~/helpers";

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

const getFish = server$(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const apiKey = getAPIKey(this.env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/search/`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  return [data[0].FishResult, data[1].RecipeResult];
});

export default component$(() => {
  useVisibleTask$(async () => {
    if (
      !window.localStorage.getItem("fish") ||
      !window.localStorage.getItem("recipes")
    ) {
      const [fish, recipes] = await getFish();

      window.localStorage.setItem("fish", JSON.stringify(fish));
      window.localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  });

  return (
    <div class="min-h-full bg-gray-100 ">
      <div class="bg-gradient-to-r from-cyan-700 to-purple-700">
        <Header />
      </div>

      <main class="pt-10">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Slot />
        </div>
      </main>
      <Footer />
    </div>
  );
});
