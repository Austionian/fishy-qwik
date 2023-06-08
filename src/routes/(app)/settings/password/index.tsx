import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import SaveCancel from "~/components/save-cancel/save-cancel";
import Alert from "~/components/alert/alert";

import { passwordUpdateObject } from "~/constants/zod/passwordUpdateObject";
import { getFetchDetails } from "~/helpers";

export const useUpdatePassword = routeAction$(
  async (passwordForm, { cookie, env }) => {
    const { domain, apiKey } = getFetchDetails(env);
    const user_id = cookie.get("user_id")?.value;
    if (!user_id) {
      return {
        error: "No user id found.",
      };
    }
    const current_password = passwordForm.current_password;
    const new_password = passwordForm.new_password;
    const confirm_password = passwordForm.confirm_password;

    const response = await fetch(`${domain}/v1/user/change_password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_id,
        current_password,
        new_password,
        new_password_check: confirm_password,
      }),
    });

    if (!response.ok) {
      return {
        error: true,
        errorText: `Error: ${response.statusText}`,
      };
    }
  },
  zod$(passwordUpdateObject)
);

export default component$(() => {
  const formAction = useUpdatePassword();
  const saveValue = useSignal("Save");
  const hideAlert = useSignal(true);
  const validating = useSignal(false);
  const success = useSignal(true);
  const failureText = useSignal("");

  return (
    <Form
      class="divide-y divide-gray-200 dark:divide-white/10 lg:col-span-9"
      action={formAction}
      onSubmit$={() => {
        if (formAction.value?.failed) {
          validating.value = false;
          if (
            formAction.value.formErrors &&
            formAction.value.formErrors?.length > 0
          ) {
            failureText.value = formAction.value.formErrors[0];
          }
          hideAlert.value = false;
        }
      }}
      onSubmitCompleted$={() => {
        validating.value = false;
        if (!formAction.value?.error && !formAction.value?.failed) {
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
          success={success}
          successText={"Password successfully updated!"}
          failureText={failureText}
          hideAlert={hideAlert}
        />
      ) : null}
      <div class="px-4 py-6 sm:p-6 lg:pb-8 flex flex-col">
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Password
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Update your password.
          </p>
        </div>
        <div class="mt-6 flex flex-col lg:flex-row">
          <div class="flex-grow space-y-6">
            <div>
              <label
                for="current_password"
                class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Current Password
              </label>
              <div class="mt-2">
                <input
                  id="current_password"
                  name="current_password"
                  type="password"
                  autoComplete="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
                {formAction.value?.failed && (
                  <div class="text-left text-red-600 text-sm">
                    {formAction.value?.fieldErrors?.current_password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="new_password"
                class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                New Password
              </label>
              <div class="mt-2">
                <input
                  id="new_password"
                  name="new_password"
                  type="password"
                  autoComplete="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
                {formAction.value?.failed && (
                  <div class="text-left text-red-600 text-sm">
                    {formAction.value?.fieldErrors?.new_password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                for="confirm_password"
                class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Confirm Password
              </label>
              <div class="mt-2">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
                {formAction.value?.failed && (
                  <div class="text-left text-red-600 text-sm">
                    {formAction.value?.fieldErrors?.confirm_password}
                  </div>
                )}
              </div>
            </div>
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
