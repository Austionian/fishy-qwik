import { type Cookie } from "@builder.io/qwik-city";
import {
  TWO_WEEKS_FROM_TODAY_DATE,
  ONE_DAY_FROM_TODAY_DATE,
  GUEST,
} from "~/constants/constants";

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
  const user_id = cookie.get("user_id")?.value || "";
  // if (user_id !== "" && user_id !== GUEST) {
  //   // save to db
  // }
  //
  const expire_date =
    user_id === GUEST ? ONE_DAY_FROM_TODAY_DATE : TWO_WEEKS_FROM_TODAY_DATE;
  cookie.set("age", age, {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });
  cookie.set("weight", weight, {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });
  cookie.set("sex", sex, {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });
  cookie.set("plan_to_get_pregnant", plan_to_get_pregnant, {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });
  cookie.set("portion", portion, {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });
  cookie.set("user-details", "true", {
    path: "/",
    sameSite: "strict",
    expires: expire_date,
  });

  return {
    success: false,
  };
};

export default saveUserDetails;
