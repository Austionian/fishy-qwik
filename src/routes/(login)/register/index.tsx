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
import LoginFormLayout from "~/components/login-form-layout/login-form-layout";

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
    <LoginFormLayout>
      <h1 class="text-left text-xl text-gray-800 font-bold tracking-tight dark:text-gray-100">
        Create an account
      </h1>
      {action.value?.failed && (
        <div class="text-left text-red-400">{action.value?.formErrors}</div>
      )}
      <Form action={action} class="space-y-6 mt-6">
        <div>
          <label
            for="email"
            class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
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
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
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
            class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
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
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
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
            class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
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
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
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
            class="flex w-full justify-center rounded-md bg-teal-700 text-gray-100 hover:text-white dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-gray-950 dark:hover:text-black px-3 py-2 text-sm font-semibold text-whiwte shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            SIGN UP
          </button>
          <div class="mt-5">
            <a href="/login">
              <button
                type="button"
                class="text-teal-700 dark:text-teal-400 text-sm w-full font-bold rounded hover:bg-black/5 dark:hover:text-teal-300 hover:text-teal-800 dark:hover:bg-white/10 p-2"
              >
                CANCEL
              </button>
            </a>
          </div>
        </div>
      </Form>
    </LoginFormLayout>
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
