import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, Form, zod$, routeAction$ } from "@builder.io/qwik-city";
import { animate } from "motion";
import { getUserDetails } from "~/helpers";
import type UserDetails from "~/types/UserDetails";
import PORTIONS from "~/constants/portions";
import { saveUserDetails } from "~/services/saveUserDetails";
import { userDetailsObject } from "~/constants/zod/userDetailsObject";

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetails(cookie);
});

export const useUpdateUserInfoAction = routeAction$(
  async (infoForm, { cookie }) => {
    const weight = infoForm.weight;
    const age = infoForm.age;
    const sex = infoForm.sex;
    const plan_to_get_pregnant = infoForm.plan_to_get_pregnant || "";
    const portion = infoForm.portion;

    const res = await saveUserDetails(
      cookie,
      weight,
      age,
      sex,
      plan_to_get_pregnant,
      portion
    );

    if (!res.success) {
      console.error(res.error);
    }
  },
  zod$(userDetailsObject)
);

export default component$(() => {
  const userDetails = useUserDetails();
  const formAction = useUpdateUserInfoAction();
  const isMale = useSignal(
    userDetails.value.sex === "Male" || userDetails.value.sex === undefined
  );
  const saveValue = useSignal("Save");
  const saveRef = useSignal<HTMLElement>();
  const hideAlert = useSignal(false);
  const alertRef = useSignal<HTMLElement>();

  useVisibleTask$(({ track }) => {
    track(() => saveValue.value);
    if (saveRef.value && alertRef.value) {
      if (saveValue.value !== "Save") {
        animate(
          saveRef.value,
          { scale: [0.5, 2, 1], opacity: [0, 1] },
          { duration: 0.5, easing: "ease-in" }
        );
        animate(
          alertRef.value,
          { scale: [0.95, 1], opacity: [0, 1] },
          { duration: 0.2, easing: "ease-out" }
        );
      }
    }
  });

  return (
    <Form
      class="divide-y divide-gray-200 dark:divide-white/10 lg:col-span-9"
      action={formAction}
      onSubmitCompleted$={() => {
        if (formAction.status === 200) {
          saveValue.value = "";
        }
      }}
    >
      {saveValue.value !== "Save" && !hideAlert.value ? (
        <div
          ref={alertRef}
          class="rounded-md bg-teal-50 p-4 fixed top-[10px] sm:top-[70px] left-[5%] w-[90%] max-w-7xl mx-auto ring-teal-500 ring-1 z-50"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-teal-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-teal-800">
                Successfully updated!
              </p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-teal-50 p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-teal-50"
                  onClick$={() => (hideAlert.value = true)}
                >
                  <span class="sr-only">Dismiss</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div class="px-4 py-6 sm:p-6 lg:pb-8 flex flex-col">
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Profile
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Enter your information to see a personalized serving recommendation
            for the fish in our app.
          </p>
        </div>

        <div class="mt-6 grid-cols-12 gap-6 flex flex-col">
          <div class="my-2">
            <label
              for="weight"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Weight
            </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="weight"
                id="weight"
                value={userDetails.value.weight}
                onChange$={(e) => (userDetails.value.weight = e.target.value)}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                placeholder="200"
                aria-describedby="weight-currency"
                autoFocus
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-gray-500 sm:text-sm" id="weight-format">
                  lbs
                </span>
              </div>
            </div>
            {formAction.value?.failed && (
              <div class="text-left text-red-600 text-sm">
                {formAction.value?.fieldErrors?.weight}
              </div>
            )}
          </div>
          <div class="my-2">
            <label
              for="age"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Age
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="age"
                id="age"
                value={userDetails.value.age}
                onChange$={(e) => (userDetails.value.age = e.target.value)}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                placeholder="44"
              />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.age}
                </div>
              )}
            </div>
          </div>
          <div class="my-2">
            <label
              for="sex"
              class="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Sex
            </label>
            <div class="mt-2">
              <select
                id="sex"
                name="sex"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                onChange$={(e) => {
                  isMale.value = e.target.value === "Male";
                  userDetails.value.sex = e.target.value;
                }}
              >
                <option selected={userDetails.value.sex === "Male"}>
                  Male
                </option>
                <option selected={userDetails.value.sex === "Female"}>
                  Female
                </option>
              </select>
            </div>
          </div>
          {!isMale.value && (
            <div class="my-2">
              <label
                for="plan_to_get_pregnant"
                class="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                Plan to get pregnant?
              </label>
              <div class="mt-2">
                <select
                  id="plan_to_get_pregnant"
                  name="plan_to_get_pregnant"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  onChange$={(e) =>
                    (userDetails.value.plan_to_get_pregnant = e.target.value)
                  }
                >
                  <option
                    selected={userDetails.value.plan_to_get_pregnant === "true"}
                  >
                    Yes
                  </option>
                  <option
                    selected={
                      userDetails.value.plan_to_get_pregnant === "false"
                    }
                  >
                    No
                  </option>
                </select>
              </div>
            </div>
          )}
          <div class="my-2">
            <label class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Portion Size
            </label>
            <p class="text-sm text-gray-500 dark:text-gray-300">
              What is your perfered portion size?
            </p>
            {formAction.value?.failed && (
              <div class="text-left text-red-600 text-sm">
                {formAction.value?.fieldErrors?.portion}
              </div>
            )}
            <fieldset class="mt-4">
              <legend class="sr-only">Portion Size</legend>
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {PORTIONS.map((portion, i) => (
                  <div key={i} class="flex items-center">
                    <input
                      id={portion.label}
                      value={portion.value}
                      name="portion"
                      type="radio"
                      checked={portion.value === userDetails.value.portion}
                      onChange$={(e) =>
                        (userDetails.value.portion = e.target.value)
                      }
                      class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
                    />
                    <label
                      for={portion.label}
                      class="ml-3 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                    >
                      {portion.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="divide-y divide-gray-200 dark:divide-white/10 pt-6">
        <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
          <a href="/">
            <button
              type="button"
              class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
            >
              Cancel
            </button>
          </a>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {saveValue.value}
            {saveValue.value === "Save" ? null : (
              <span ref={saveRef}>{`\u2713`}</span>
            )}
          </button>
        </div>
      </div>
    </Form>
  );
});
