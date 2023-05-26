import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, Form, zod$, routeAction$ } from "@builder.io/qwik-city";
import { animate } from "motion";
import { getUserDetails } from "~/helpers";
import type UserDetails from "~/types/UserDetails";
import PORTIONS from "~/constants/portions";
import saveUserDetails from "~/services/saveUserDetails";
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

    await saveUserDetails(
      cookie,
      weight,
      age,
      sex,
      plan_to_get_pregnant,
      portion
    );
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

  useVisibleTask$(({ track }) => {
    track(() => saveValue.value);
    if (saveRef.value) {
      if (saveValue.value !== "Save") {
        animate(
          saveRef.value,
          { scale: [0.5, 2, 1], opacity: [0, 1] },
          { duration: 0.5, easing: "ease-in" }
        );
      }
    }
  });

  return (
    <Form
      class="divide-y divide-gray-200 lg:col-span-9"
      action={formAction}
      onSubmitCompleted$={() => {
        if (formAction.status === 200) {
          saveValue.value = "Saved";
        }
      }}
    >
      <div class="px-4 py-6 sm:p-6 lg:pb-8 flex flex-col">
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
          <p class="mt-1 text-sm text-gray-500">
            Enter your information to see a personalized serving recommendation
            for the fish in our app.
          </p>
        </div>

        <div class="mt-6 grid-cols-12 gap-6 flex flex-col">
          <div class="my-2">
            <label
              for="weight"
              class="block text-sm font-medium leading-6 text-gray-900"
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
                class={
                  saveValue.value === "Save"
                    ? "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ring-1 ring-inset ring-teal-500"
                }
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
              class="block text-sm font-medium leading-6 text-gray-900"
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
                class={
                  saveValue.value === "Save"
                    ? "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ring-1 ring-inset ring-teal-500"
                }
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
            <label for="sex" class="text-sm font-semibold text-gray-900">
              Sex
            </label>
            <div class="mt-2">
              <select
                id="sex"
                name="sex"
                class={
                  saveValue.value === "Save"
                    ? "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ring-1 ring-inset ring-teal-500"
                }
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
                class="text-sm font-semibold text-gray-900"
              >
                Plan to get pregnant?
              </label>
              <div class="mt-2">
                <select
                  id="plan_to_get_pregnant"
                  name="plan_to_get_pregnant"
                  class={
                    saveValue.value === "Save"
                      ? "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      : "block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 ring-1 ring-inset ring-teal-500"
                  }
                  value={userDetails.value.plan_to_get_pregnant || "No"}
                  onChange$={(e) =>
                    (userDetails.value.plan_to_get_pregnant = e.target.value)
                  }
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          )}
          <div class="my-2">
            <label class="text-sm font-semibold text-gray-900">
              Portion Size
            </label>
            <p class="text-sm text-gray-500">
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
                      class="ml-3 block text-sm font-medium leading-6 text-gray-900"
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
      <div class="divide-y divide-gray-200 pt-6">
        <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
          <a href="/">
            <button
              type="button"
              class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
