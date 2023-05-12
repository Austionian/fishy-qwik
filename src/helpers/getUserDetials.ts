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
  return {
    needed: false,
    weight: cookie.get("weight")?.value,
    age: cookie.get("age")?.value,
    sex: cookie.get("sex")?.value,
    plan_to_get_pregnant: cookie.get("plan_to_get_pregnant")?.value,
    portion: cookie.get("portion")?.value,
    image: cookie.get("image")?.value,
  };
};
