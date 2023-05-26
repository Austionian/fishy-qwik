import { type Cookie } from "@builder.io/qwik-city";
import type UserDetails from "~/types/UserDetails";

export default (cookie: Cookie): UserDetails => {
  if (!cookie.get("user-details")) {
    return {
      needed: true,
      weight: undefined,
      age: undefined,
      sex: undefined,
      plan_to_get_pregnant: undefined,
      portion: undefined,
      image: undefined,
    };
  }
  const weight = cookie.get("weight")?.value;
  const age = cookie.get("age")?.value;
  const sex = cookie.get("sex")?.value;
  const plan_to_get_pregnant = cookie.get("plan_to_get_pregnant")?.value;
  const portion = cookie.get("portion")?.value;
  const image = cookie.get("image")?.value;
  return {
    needed: !weight && !age && !sex && !portion,
    weight,
    age,
    sex,
    plan_to_get_pregnant,
    portion,
    image,
  };
};
