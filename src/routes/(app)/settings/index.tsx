import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, Form, zod$, routeAction$ } from "@builder.io/qwik-city";
import { getUserDetails } from "~/helpers";
import type UserDetails from "~/types/UserDetails";
import PORTIONS from "~/constants/portions";
import { saveUserDetails } from "~/services/saveUserDetails";
import { userDetailsObject } from "~/constants/zod/userDetailsObject";
import Alert from "~/components/alert/alert";
import SaveCancel from "~/components/save-cancel/save-cancel";

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
      return {
        error: true,
        errorText: `Error: ${res.error}`,
      };
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
  const hideAlert = useSignal(true);
  const validating = useSignal(false);
  const failureText = useSignal("");
  const success = useSignal(true);

  return (
    <Form
      class="divide-y divide-gray-200 dark:divide-white/10 lg:col-span-9"
      action={formAction}
      onSubmitCompleted$={() => {
        validating.value = false;
        if (formAction.status === 200) {
          saveValue.value = `\u2713`;
        } else {
          success.value = false;
          failureText.value =
            formAction.value?.errorText || "Unable to complete request.";
        }
        hideAlert.value = false;
      }}
    >
      {!hideAlert.value ? (
        <Alert
          successText={"Successfully updated!"}
          hideAlert={hideAlert}
          success={success}
          failureText={failureText}
        />
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
      <SaveCancel
        validating={validating}
        saveValue={saveValue}
        cancelHref={"/"}
      />
    </Form>
  );
});
