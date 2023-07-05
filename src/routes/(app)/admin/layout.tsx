import { type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
  if (!cookie.get("admin")?.value) {
    throw redirect(302, "/");
  }
};
