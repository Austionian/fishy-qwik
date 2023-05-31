import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Form, globalAction$, server$ } from "@builder.io/qwik-city";
import { animate } from "motion";
import { getFetchDetails } from "~/helpers";

export const serverDeleteAccount = server$(async function () {
  const { domain, apiKey } = getFetchDetails(this.env);
  const user_id = this.cookie.get("user_id");
  if (!user_id) {
    return {
      failed: true,
      error: "No user id found.",
    };
  }
  const response = await fetch(`${domain}/v1/user/delete/${user_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!response.ok) {
    console.error(response.statusText);
    return {
      failed: true,
      error: `Error: ${response.statusText}`,
    };
  }
  return {
    failed: false,
  };
});

export const useDeleteAction = globalAction$(async (_, { redirect }) => {
  const res = await serverDeleteAccount();
  if (res.failed) {
    return {
      failed: true,
      error: "Error deleting account.",
    };
  }
  throw redirect(302, "/login");
});

type DeleteModalProps = {
  showDeleteModal: {
    value: boolean;
  };
};

export default component$(({ showDeleteModal }: DeleteModalProps) => {
  const formAction = useDeleteAction();
  const backdropRef = useSignal<Element>();
  const modalRef = useSignal<Element>();

  useVisibleTask$(({ track }) => {
    track(() => showDeleteModal.value);
    if (backdropRef.value && modalRef.value) {
      if (showDeleteModal.value) {
        animate(
          backdropRef.value,
          { opacity: [0, 100] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
        animate(
          modalRef.value,
          { opacity: [0, 100], scale: [0.95, 1] },
          {
            duration: 0.1,
            easing: "ease-out",
          }
        );
      }
    }
  });

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={backdropRef}
        class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
      ></div>

      <div ref={modalRef} class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <div class="ml-auto pl-3 text-right">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    class="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick$={() => (showDeleteModal.value = false)}
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
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Are you sure you want to delete your account?
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Your information will not be recoverable.
                  </p>
                </div>
              </div>
            </div>

            <Form action={formAction}>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick$={() => (showDeleteModal.value = false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                >
                  DELETE
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
