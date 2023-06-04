import { type Cookie } from "@builder.io/qwik-city";

/**
 * Deletes all the cookies created by fishy-qwik.
 */
const deleteAllCookies = (cookie: Cookie) => {
  cookie.delete("token", { path: "/" });
  cookie.delete("user_id", { path: "/" });
  cookie.delete("admin", { path: "/" });
  cookie.delete("email", { path: "/" });
  cookie.delete("age", { path: "/" });
  cookie.delete("plan_to_get_pregnant", { path: "/" });
  cookie.delete("portion", { path: "/" });
  cookie.delete("sex", { path: "/" });
  cookie.delete("weight", { path: "/" });
  cookie.delete("image", { path: "/" });
  cookie.delete("firstName", { path: "/" });
  cookie.delete("lastName", { path: "/" });
};

export default deleteAllCookies;
