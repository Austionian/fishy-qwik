import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  zod$,
  z,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";
import { v4 as uuidv4 } from "uuid";
import { saveUserDetailsToCookies } from "~/services/saveUserDetails";

export type UserLoginResponse = {
  user_id: string;
  is_admin: boolean;
  data: {
    weight?: number;
    age?: number;
    sex?: string;
    plan_to_get_pregnant?: string;
    portion_size?: string;
    image_url?: string;
    first_name?: string;
    last_name?: string;
  };
};

export const useLoginFormAction = routeAction$(
  async (loginForm, { env, redirect, cookie, url, platform }) => {
    const TWO_WEEKS_MS = 12096e5;
    const TWO_WEEKS_SEC = 1209600;
    const TWO_WEEKS_FROM_TODAY_DATE = new Date(Date.now() + TWO_WEEKS_MS);
    const email = loginForm.email;
    const password = loginForm.password;
    const { apiKey, domain } = getFetchDetails(env);
    const response = await fetch(`${domain}/v1/login`, {
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
      if (response.statusText === "Unauthorized") {
        return {
          failed: true,
          formErrors: "Invalid email address and/ or password.",
        };
      }
      return {
        failed: true,
        formErrors: `Error: ${response.statusText}`,
      };
    }
    const res: UserLoginResponse = await response.json();

    const token = uuidv4();
    if (import.meta.env.PROD) {
      // add session to kv
      await platform.env.FISHY_KV.put(res.user_id, token, {
        expirationTtl: TWO_WEEKS_SEC,
      });
    }

    saveUserDetailsToCookies(
      cookie,
      TWO_WEEKS_FROM_TODAY_DATE,
      res.data.age,
      res.data.weight,
      res.data.sex,
      res.data.plan_to_get_pregnant,
      res.data.portion_size,
      res.data.first_name,
      res.data.last_name
    );

    if (res.data.image_url) {
      cookie.set("image", res.data.image_url, {
        path: "/",
        sameSite: "strict",
        expires: TWO_WEEKS_FROM_TODAY_DATE,
      });
    }

    cookie.set("user_id", res.user_id, {
      path: "/",
      sameSite: "strict",
      expires: TWO_WEEKS_FROM_TODAY_DATE,
      secure: true,
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
    if (res.is_admin) {
      cookie.set("admin", "true", {
        path: "/",
        sameSite: "strict",
        expires: TWO_WEEKS_FROM_TODAY_DATE,
      });
    }
    let redirectUrl = new URL(url).searchParams.get("redirect") || "/";
    redirectUrl = redirectUrl === "/" ? "/" : new URL(redirectUrl).pathname;
    throw redirect(303, redirectUrl);
  },
  zod$({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
);

export const useGuestOption = routeAction$(async (_, { cookie, redirect }) => {
  const ONE_DAY_MS = 8.64e7;
  const ONE_DAY_FROM_TODAY_DATE = new Date(Date.now() + ONE_DAY_MS);
  const GUEST = "GUEST";
  cookie.set("user_id", GUEST, {
    path: "/",
    sameSite: "strict",
    expires: ONE_DAY_FROM_TODAY_DATE,
  });
  throw redirect(303, "/splash/");
});

export default component$(() => {
  const action = useLoginFormAction();
  const guestAction = useGuestOption();
  const validating = useSignal(false);

  useVisibleTask$(() => {
    window.localStorage.clear();
  });

  return (
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-900 px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <h1 class="my-6 text-center text-5xl font-bold tracking-tight dark:text-gray-100 text-gray-900">
            Gigiigoo
          </h1>
          <Form
            action={action}
            class="space-y-6"
            onSubmitCompleted$={() => {
              if (action.value?.failed) {
                validating.value = false;
              }
            }}
          >
            {action.value?.failed && (
              <div class="text-left text-red-400">
                {action.value?.formErrors}
              </div>
            )}
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
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-teal-700 text-gray-100 hover:text-white dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-gray-950 dark:hover:text-black px-3 py-2 text-sm font-semibold text-whiwte shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                onClick$={() => (validating.value = true)}
              >
                {validating.value ? (
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#fff"
                    class="h-5 w-5"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.7s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </div>
          </Form>
          <Form action={guestAction} class="mt-5">
            <div>
              <button
                type="submit"
                class="text-teal-700 dark:text-teal-400 text-sm w-full font-bold rounded hover:bg-black/5 dark:hover:text-teal-300 hover:text-teal-800 dark:hover:bg-white/10 p-2"
              >
                CONTINUE AS GUEST
              </button>
            </div>
          </Form>

          <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-300">
            Need an account?
            <a
              href="/register"
              class="ml-2 font-semibold leading-6 text-teal-700 hover:text-teal-600 dark:text-teal-500 dark:hover:text-teal-400"
            >
              Create one here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign In",
  meta: [
    {
      name: "description",
      content:
        "Login and learn healthy, personalized fish portions and nutritional contents",
    },
  ],
};
