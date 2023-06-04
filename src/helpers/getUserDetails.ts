import { type Cookie } from "@builder.io/qwik-city";
import type UserDetails from "~/types/UserDetails";

export default (cookie: Cookie): UserDetails => {
  const weight = cookie.get("weight")?.value;
  const age = cookie.get("age")?.value;
  const sex = cookie.get("sex")?.value;
  const plan_to_get_pregnant = cookie.get("plan_to_get_pregnant")?.value;
  const portion = cookie.get("portion")?.value;
  const image = cookie.get("image")?.value;
  const email = cookie.get("email")?.value;
  const firstName = cookie.get("firstName")?.value;
  const lastName = cookie.get("lastName")?.value;

  return {
    needed: !weight || !age || !sex || !portion,
    weight,
    age,
    sex,
    plan_to_get_pregnant,
    portion,
    image,
    email,
    firstName,
    lastName,
  };
};
