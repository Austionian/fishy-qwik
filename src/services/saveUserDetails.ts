import { type Cookie } from "@builder.io/qwik-city";

/**
 * Saves the users details to the database and updates the cookies locally.
 * Only pass validated data to this function.
 */
const saveUserDetails = (
  cookie: Cookie,
  weight: number,
  age: number,
  sex: string,
  plan_to_get_pregnant: string,
  portion: string
) => {
  // if (cookie.get("email")) {
  //   // save to db
  // }
  //
  cookie.set("age", age, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("weight", weight, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("sex", sex, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("plan_to_get_pregnant", plan_to_get_pregnant, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("portion", portion, {
    path: "/",
    sameSite: "lax",
  });
  cookie.set("user-details", "true", {
    path: "/",
    sameSite: "lax",
  });

  return {
    success: false,
  };
};

export default saveUserDetails;
