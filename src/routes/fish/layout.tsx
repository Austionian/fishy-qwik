import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

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
    <div>
      <Slot />
    </div>
  );
});
