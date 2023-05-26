import { server$, type Cookie } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

const serverSaveUserDetails = server$(async function (
  user_id: string,
  weight: number,
  age: number,
  sex: string,
  plan_to_get_pregnant: string,
  portion: string
) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  const weightStr = weight.toString();
  const ageStr = age.toString();
  const plan_to_get_pregnantStr =
    plan_to_get_pregnant && plan_to_get_pregnant === "Yes" ? "true" : "false";
  const response = await fetch(`${domain}/v1/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user_id,
      weight: weightStr,
      age: ageStr,
      sex,
      plan_to_get_pregnant: plan_to_get_pregnantStr,
      portion_size: portion,
    }),
  });
  if (!response.ok) {
    console.error(response.statusText);
    return {
      failed: true,
      formErrors: `Error: ${response.statusText}`,
    };
  }
});

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
  const TWO_WEEKS_MS = 12096e5;
  const ONE_DAY_MS = 8.64e7;
  const TWO_WEEKS_FROM_TODAY_DATE = new Date(Date.now() + TWO_WEEKS_MS);
  const ONE_DAY_FROM_TODAY_DATE = new Date(Date.now() + ONE_DAY_MS);
  const GUEST = "GUEST";

  const user_id = cookie.get("user_id")?.value || "";
  if (user_id !== "" && user_id !== GUEST) {
    serverSaveUserDetails(
      user_id,
      weight,
      age,
      sex,
      plan_to_get_pregnant,
      portion
    );
  }

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
