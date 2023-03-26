import { component$ } from "@builder.io/qwik";
import { zod$, z, Form, routeAction$ } from "@builder.io/qwik-city";

export const useSignUpFormAction = routeAction$(
  async (signUpForm, { url, redirect, cookie }) => {
    const email = signUpForm.email;
    // const response = await fetch("https://mcwfishapp.com/update", {
    //   body: email,
    // }).then((res) => res.json());
    if (email !== "austin@austin.com") {
      return {
        success: false,
        fieldErrors: {
          email: "Unable to register new user",
        },
      };
    }
    cookie.set("fish-login", "true", {
      path: "/",
    });
    const redirectUrl = new URL(url).searchParams.get("redirect") || "/fish/";
    throw redirect(303, redirectUrl);
  },
  zod$({
    email: z.string().email().nonempty(),
  })
);

export default component$(() => {
  const action = useSignUpFormAction();

  return (
    <div class="mt-36 max-w-sm m-auto">
      <div class="py-7">
        <h1 class="text-5xl text-white font-bold">Boozhoo!</h1>
      </div>
      <div class="text-left">
        <p class="text-white">
          This app calculates your safe consumption levels of fish that are
          caught in the 1836 Treaty territories monitored by the Chippewa-Ottawa
          Resource Authority!
        </p>
      </div>
      <div class="mt-72">
        <Form action={action}>
          <div class="text-left mb-7">
            <label class="text-white font-bold text-xs">Email Address</label>
            <br />
            <input type="text" name="email" class="min-w-full p-3 rounded" />
          </div>
          {!action.value?.success && (
            <div>{action.value?.fieldErrors?.email}</div>
          )}
          <div class="mb-7">
            <button
              type="submit"
              class="bg-teal-600 rounded p-3 min-w-full text-white font-bold"
            >
              SIGN UP
            </button>
          </div>
          <div class="text-teal-600 font-bold">CONTINUE AS GUEST</div>
        </Form>
      </div>
    </div>
  );
});
