import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";
import SaveButton from "~/components/save-button/save-button";
import SuccessModal from "~/components/success-modal/success-modal";

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

    const res = await fetch(`${domain}/v1/user/change_password`, {
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

    if (!res.ok) {
      return {
        error: res.statusText,
      };
    }
  },
  zod$(passwordUpdateObject)
);

export default component$(() => {
  const action = useUpdatePassword();
  const saveValue = useSignal("Save");
  const hideAlert = useSignal(false);
  const validating = useSignal(false);

  return (
    <Form
      class="divide-y divide-gray-200 dark:divide-white/10 lg:col-span-9"
      action={action}
      onSubmitCompleted$={() => {
        validating.value = false;
        if (action.status === 200) {
          saveValue.value = "\u2713";
        }
      }}
    >
      {saveValue.value !== "Save" && !hideAlert.value ? (
        <SuccessModal
          text={"Password successfully updated!"}
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
        {action.value?.failed && (
          <div class="text-left text-red-400">{action.value?.formErrors}</div>
        )}
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
              </div>
            </div>
          </div>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-white/10 pt-6">
          <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
            <button
              type="button"
              class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
            >
              Cancel
            </button>
            <SaveButton validating={validating} saveValue={saveValue} />
          </div>
        </div>
      </div>
    </Form>
  );
});
