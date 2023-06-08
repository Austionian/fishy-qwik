import { component$ } from "@builder.io/qwik";

type Props = {
  successText: string;
  failureText: {
    value: string;
  };
  hideAlert: {
    value: boolean;
  };
  success: {
    value: boolean;
  };
};

export default component$(
  ({ successText, failureText, hideAlert, success }: Props) => {
    return success.value ? (
      <div
        class={`rounded-md bg-teal-50 dark:bg-teal-800 p-4 fixed top-[10px] sm:top-[70px] left-[5%] w-[90%] max-w-7xl mx-auto ring-teal-500 dark:ring-white/10 ring-1 z-50`}
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class={`h-5 w-5 text-teal-400 dark:text-teal-100`}
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
            <p class={`text-sm font-medium text-teal-800 dark:text-teal-100`}>
              {successText}
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                type="button"
                class={`inline-flex rounded-md bg-teal-50 dark:bg-teal-800 p-1.5 text-teal-500 dark:text-teal-100 hover:bg-teal-100 dark:hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-teal-50`}
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
    ) : (
      <div
        class={`rounded-md bg-red-50 dark:bg-red-800 p-4 fixed top-[10px] sm:top-[70px] left-[5%] w-[90%] max-w-7xl mx-auto ring-red-500 dark:ring-white/10 ring-1 z-50`}
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class={`h-5 w-5 text-red-400 dark:text-red-100`}
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
            <p class={`text-sm font-medium text-red-800 dark:text-red-100`}>
              {failureText.value}
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                type="button"
                class={`inline-flex rounded-md bg-red-50 dark:bg-red-800 p-1.5 text-red-500 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50`}
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
    );
  }
);
