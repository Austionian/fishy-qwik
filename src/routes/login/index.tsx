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
    const redirectUrl = new URL(url).searchParams.get("redirect") || "/";
    throw redirect(303, redirectUrl);
  }
);

export default component$(() => {
  const action = useSignUpFormAction();
  const guestAction = useGuestOption();
  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />

        <h1 class="my-6 text-center text-5xl text-white font-bold tracking-tight">
          Boozhoo!
        </h1>
        <div class="text-left px-2">
          <p class="text-white">
            This app calculates your safe consumption levels of fish that are
            caught in the 1836 Treaty territories monitored by the
            Chippewa-Ottawa Resource Authority!
          </p>
        </div>
      </div>

      <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form action={action} class="space-y-6">
            <div>
              <label
                for="email"
                class="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!action.value?.success && (
                  <div class="text-left text-red-400">
                    {action.value?.fieldErrors?.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SIGN UP
              </button>
            </div>
          </Form>
          <Form action={guestAction} class="mt-7">
            <div class="text-indigo-500 font-bold">
              <button type="submit">CONTINUE AS GUEST</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});
