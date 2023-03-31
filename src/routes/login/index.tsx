import { component$ } from "@builder.io/qwik";
import { zod$, z, Form, routeAction$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";

export const useSignUpFormAction = routeAction$(
  async (signUpForm, { env, url, redirect, cookie }) => {
    const email = signUpForm.email;
    const apiKey = getAPIKey(env);
    const response = await fetch(
      "https://fishy-edge-tvp4i.ondigitalocean.app/v1/register",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
        }),
      }
    );
    if (!response.ok) {
      return {
        success: false,
        fieldErrors: {
          email: `Error: ${response.status} - ${response.statusText}`,
        },
      };
    }
    cookie.set("fish-login", "true", {
      path: "/",
    });
    cookie.set("email", "true", {
      path: "/",
    });
    const redirectUrl = new URL(url).searchParams.get("redirect") || "/";
    throw redirect(303, redirectUrl);
  },
  zod$({
    email: z.string().email().nonempty(),
  })
);

export const useGuestOption = routeAction$(
  async (_, { url, cookie, redirect }) => {
    cookie.set("fish-login", "true", {
      path: "/",
    });
    cookie.set("guest", "true", {
      path: "/",
    });
    const redirectUrl = new URL(url).searchParams.get("redirect") || "/fish/";
    throw redirect(303, redirectUrl);
  }
);

export default component$(() => {
  const action = useSignUpFormAction();
  const guestAction = useGuestOption();

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
          <div class="text-left">
            <label class="text-white font-bold text-xs">Email Address</label>
            <br />
            <input type="text" name="email" class="min-w-full p-3 rounded" />
          </div>
          {!action.value?.success && (
            <div class="text-left text-red-400">
              {action.value?.fieldErrors?.email}
            </div>
          )}
          <div class="my-7">
            <button
              type="submit"
              class="bg-teal-600 rounded p-3 min-w-full text-white font-bold"
            >
              SIGN UP
            </button>
          </div>
        </Form>
        <Form action={guestAction}>
          <div class="text-teal-600 font-bold">
            <button type="submit">CONTINUE AS GUEST</button>
          </div>
        </Form>
      </div>
    </div>
  );
});
