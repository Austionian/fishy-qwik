import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, zod$ } from "@builder.io/qwik-city";

import { passwordUpdateObject } from "~/constants/zod/passwordUpdateObject";

export const useUpdatePassword = routeAction$(async () => {
  return {};
}, zod$(passwordUpdateObject));

export default component$(() => {
  const formAction = useUpdatePassword();
  const saveValue = useSignal("Save");
  return (
    <Form
      class="divide-y divide-gray-200 lg:col-span-9"
      action={formAction}
      onSubmitCompleted$={() => {
        if (formAction.status === 200) {
          saveValue.value = "Saved \u2713";
        }
      }}
    >
      <div class="px-4 py-6 sm:p-6 lg:pb-8 flex flex-col">
        <div>
          <h2 class="text-lg font-medium leading-6 text-gray-900">Password</h2>
          <p class="mt-1 text-sm text-gray-500">Update your password.</p>
        </div>
      </div>
      <div class="divide-y divide-gray-200 pt-6">
        <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {saveValue.value}
          </button>
        </div>
      </div>
    </Form>
  );
});
