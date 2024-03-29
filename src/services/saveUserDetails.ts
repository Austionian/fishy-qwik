import { $ } from "@builder.io/qwik";
import { server$, type Cookie } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

const serverSaveUserDetails = server$(async function (
  user_id: string,
  weight: number,
  age: number,
  plan_to_get_pregnant: string,
  portion: string
) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  const weightStr = weight.toString();
  const ageStr = age.toString();
  const response = await fetch(`${domain}/v1/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user_id,
      weight: weightStr,
      age: ageStr,
      plan_to_get_pregnant,
      portion_size: portion,
    }),
  });
  if (!response.ok) {
    console.error(response.statusText);
    return {
      failed: true,
      error: `Error: ${response.statusText}`,
    };
  }
});

/**
 * Saves the users details to the database and updates the cookies locally.
 * Only pass validated data to this function.
 */
export const saveUserDetails = $(
  async (
    cookie: Cookie,
    weight: number,
    age: number,
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
      const res = await serverSaveUserDetails(
        user_id,
        weight,
        age,
        plan_to_get_pregnant,
        portion
      );

      if (res?.failed) return { success: false, error: res.error };
    }

    const expire_date =
      user_id === GUEST ? ONE_DAY_FROM_TODAY_DATE : TWO_WEEKS_FROM_TODAY_DATE;

    saveUserDetailsToCookies(
      cookie,
      expire_date,
      age,
      weight,
      plan_to_get_pregnant,
      portion
    );

    return {
      success: true,
    };
  }
);

export const saveUserDetailsToCookies = (
  cookie: Cookie,
  expire_date: Date,
  age: number | undefined,
  weight: number | undefined,
  plan_to_get_pregnant: string | undefined,
  portion: string | undefined,
  first_name?: string | undefined,
  last_name?: string | undefined
) => {
  if (age) {
    cookie.set("age", age, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
  if (weight) {
    cookie.set("weight", weight, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
  if (plan_to_get_pregnant) {
    cookie.set("plan_to_get_pregnant", plan_to_get_pregnant, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
  if (portion) {
    cookie.set("portion", portion, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
  if (first_name) {
    cookie.set("firstName", first_name, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
  if (last_name) {
    cookie.set("lastName", last_name, {
      path: "/",
      sameSite: "strict",
      expires: expire_date,
    });
  }
};
