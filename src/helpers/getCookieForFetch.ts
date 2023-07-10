import { type Cookie } from "@builder.io/qwik-city";

const getCookieForFetch = (cookie: Cookie) => {
  return !cookie.get("user_id") || cookie.get("user_id")?.value === "GUEST"
    ? ""
    : `user_id=${cookie.get("user_id")?.value}`;
};

export default getCookieForFetch;
