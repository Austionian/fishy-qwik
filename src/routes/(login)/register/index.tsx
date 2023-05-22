import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  zod$,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import { newRegistrationObject } from "~/constants/zod/newRegistrationObject";
import { getFetchDetails } from "~/helpers";
import { v4 as uuidv4 } from "uuid";

export const useRegisterFormAction = routeAction$(
  async (registerForm, { env, redirect, cookie, platform }) => {
    const TWO_WEEKS_MS = 12096e5;
    const TWO_WEEKS_SEC = 1209600;
    const TWO_WEEKS_FROM_TODAY_DATE = new Date(Date.now() + TWO_WEEKS_MS);
    const email = registerForm.email;
    const password = registerForm.password;
    const { apiKey, domain } = getFetchDetails(env);
    const response = await fetch(`${domain}/v1/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });
    if (!response.ok) {
      return {
        failed: true,
        formErrors: `Error: ${response.statusText}`,
      };
    }
    const res = await response.json();
    const token = uuidv4();
    if (import.meta.env.PROD) {
      // add session to kv
      await platform.env.FISHY_KV.put(res, token, {
        expirationTtl: TWO_WEEKS_SEC,
      });
    }
    cookie.set("user_id", res, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
      secure: true,
      httpOnly: true,
    });
    cookie.set("token", token, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
      secure: true,
      httpOnly: true,
    });
    cookie.set("email", email, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
    });
    throw redirect(303, "/splash/");
  },
  zod$(newRegistrationObject)
);

export default component$(() => {
  const action = useRegisterFormAction();

  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600"
          alt="Your Company"
        />

        <h1 class="my-6 text-center text-5xl text-gray-100 font-bold tracking-tight">
          Gigiigoo
        </h1>
      </div>

      <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <h1 class="text-left text-xl text-gray-800 font-bold tracking-tight">
            Create an account
          </h1>
          {action.value?.failed && (
            <div class="text-left text-red-400">{action.value?.formErrors}</div>
          )}
          <Form action={action} class="space-y-6 mt-6">
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
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm 
                    sm:leading-6"
                />
                {action.value?.failed && (
                  <div class="text-left text-red-400">
                    {action.value?.fieldErrors?.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="password"
                class="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm 
                    sm:leading-6"
                />
                {action.value?.failed && (
                  <div class="text-left text-red-400">
                    {action.value?.fieldErrors?.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="confirmPassword"
                class="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div class="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm 
                    sm:leading-6"
                />
                {action.value?.failed && (
                  <div class="text-left text-red-400">
                    {action.value?.fieldErrors?.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                SIGN UP
              </button>
              <div class="mt-5">
                <a href="/login">
                  <button
                    type="button"
                    class="text-teal-600 text-sm w-full font-bold rounded hover:bg-gray-100 p-2"
                  >
                    CANCEL
                  </button>
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign Up",
  meta: [
    {
      name: "description",
      content:
        "Register to learn healthy, personalized fish portions and nutritional contents",
    },
  ],
};
