import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Form, globalAction$, zod$ } from "@builder.io/qwik-city";
import { animate } from "motion";
import PORTIONS from "~/constants/portions";
import type UserDetails from "~/types/UserDetails";
import { saveUserDetails } from "~/services/saveUserDetails";
import { userDetailsObject } from "~/constants/zod/userDetailsObject";
import Spinner from "../spinner/spinner";

type infoModalProps = {
  showUserInputModal: {
    value: boolean;
  };
  userDetails: {
    data: UserDetails;
  };
};

export const useSignUpFormAction = globalAction$(
  async (infoForm, { cookie }) => {
    const weight = infoForm.weight;
    const age = infoForm.age;
    const plan_to_get_pregnant = infoForm.plan_to_get_pregnant || "false";
    const portion = infoForm.portion;

    const res = await saveUserDetails(
      cookie,
      weight,
      age,
      plan_to_get_pregnant,
      portion
    );

    if (!res.success) {
      console.error(res.error);
    }
  },
  zod$(userDetailsObject)
);

export default component$(
  ({ showUserInputModal, userDetails }: infoModalProps) => {
    const formAction = useSignUpFormAction();
    const backdropRef = useSignal<Element>();
    const modalRef = useSignal<Element>();
    const validating = useSignal(false);
    const plan_to_get_pregnant = useSignal(
      userDetails.data.plan_to_get_pregnant || "false"
    );

    useVisibleTask$(({ track }) => {
      track(() => showUserInputModal.value);
      if (backdropRef.value && modalRef.value) {
        if (showUserInputModal.value && !userDetails.data.needed) {
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
            <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:ring-1 dark:ring-gray-800">
              <div>
                <div class="ml-auto pl-3 text-right">
                  <div class="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      class="inline-flex rounded-md p-1.5 text-gray-500 dark:text-gray-700 group group-hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick$={() => (showUserInputModal.value = false)}
                    >
                      <span class="sr-only">Dismiss</span>
                      <svg
                        class="h-5 w-5 dark:group-hover:fill-gray-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100pt"
                    height="100pt"
                    version="1.1"
                    viewBox="0 0 100 100"
                  >
                    <path d="m28.578 36.363c0.003906-0.62109 0.50391-1.1211 1.1211-1.1211h8.9648c0.30078-0.007813 0.59375 0.10547 0.8125 0.31641 0.21875 0.21094 0.33984 0.5 0.33984 0.80469 0 0.30078-0.12109 0.59375-0.33984 0.80469-0.21875 0.21094-0.51172 0.32422-0.8125 0.3125h-8.9648c-0.61719 0-1.1211-0.5-1.1211-1.1172zm1.1211 9.4258h22.422c0.60547-0.019531 1.0859-0.51562 1.0859-1.1172 0-0.60547-0.48047-1.1016-1.0859-1.1211h-22.422c-0.30078-0.007812-0.59766 0.10547-0.8125 0.31641-0.21875 0.21094-0.33984 0.5-0.33984 0.80469 0 0.30078 0.12109 0.58984 0.33984 0.80078 0.21484 0.21094 0.51172 0.32422 0.8125 0.31641zm0 8.3086h22.422c0.60547-0.015625 1.0859-0.51172 1.0859-1.1172s-0.48047-1.1016-1.0859-1.1211h-22.422c-0.30078-0.007813-0.59766 0.10547-0.8125 0.31641-0.21875 0.21094-0.33984 0.5-0.33984 0.80469 0 0.30078 0.12109 0.59375 0.33984 0.80469 0.21484 0.21094 0.51172 0.32422 0.8125 0.3125zm15.719 6.0703h-15.719c-0.30078-0.007813-0.59766 0.10547-0.8125 0.31641-0.21875 0.21094-0.33984 0.5-0.33984 0.80469 0 0.30469 0.12109 0.59375 0.33984 0.80469 0.21484 0.21094 0.51172 0.32422 0.8125 0.31641h15.719c0.30078 0.007813 0.59375-0.10547 0.8125-0.31641s0.33984-0.5 0.33984-0.80469c0-0.30469-0.12109-0.59375-0.33984-0.80469s-0.51172-0.32422-0.8125-0.31641zm36.824 10.891c0.007812 4.8164-2.1719 9.375-5.9297 12.391-3.7539 3.0195-8.6758 4.1641-13.375 3.1211-4.7031-1.043-8.6758-4.168-10.801-8.4883h-31.199c-1.7539-0.003906-3.1797-1.4258-3.1797-3.1797v-52.148c0-1.7578 1.4258-3.1797 3.1797-3.1797h3.7734v-3.3359c0-1.75 1.418-3.1719 3.168-3.1758h39.953c1.7578 0 3.1797 1.4219 3.1836 3.1758v39.641c3.2461 1 6.0898 3.0117 8.1094 5.7422 2.0195 2.7344 3.1133 6.0391 3.1172 9.4375zm-55.293-51.484h33.941c1.7539 0.003906 3.1719 1.4258 3.168 3.1797v32.613c1.5625-0.25391 3.1562-0.24609 4.7188 0.019531v-39.148c-0.007813-0.51953-0.42969-0.93359-0.94922-0.9375h-39.949c-0.51562 0.003907-0.92969 0.42188-0.92578 0.9375zm24.273 56.27c-1.2812-4.0586-0.88281-8.4609 1.1094-12.219 1.9922-3.7578 5.4102-6.5586 9.4883-7.7734v-33.098c0.003907-0.51562-0.41406-0.9375-0.92969-0.94141h-39.953c-0.51953 0-0.94141 0.41797-0.94531 0.94141v52.148c0.007812 0.51953 0.42578 0.9375 0.94531 0.94141zm28.777-4.7852c0-5.5156-3.3242-10.492-8.4219-12.602-5.0977-2.1133-10.965-0.94531-14.867 2.957-3.8984 3.9023-5.0664 9.7695-2.9531 14.867 2.1133 5.0977 7.0898 8.4219 12.605 8.418 7.5273-0.011719 13.629-6.1094 13.637-13.641zm-13.637-5.375c-0.61719 0-1.1172 0.50391-1.1172 1.1211v13.465-0.003906c0.015625 0.60547 0.51172 1.0859 1.1172 1.0859s1.1016-0.48047 1.1211-1.0859v-13.465c-0.003906-0.61719-0.50391-1.1172-1.1211-1.1172zm0-4.9492v0.003906c-0.61719 0-1.1172 0.5-1.1172 1.1172v1.082c-0.011719 0.30078 0.10156 0.59375 0.3125 0.8125 0.21094 0.21875 0.50391 0.33984 0.80469 0.33984 0.30469 0 0.59375-0.12109 0.80469-0.33984 0.21094-0.21875 0.32422-0.51172 0.31641-0.8125v-1.082c-0.003906-0.61719-0.50391-1.1172-1.1211-1.1172z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                    id="modal-title"
                  >
                    Your Information
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Enter your information to see a personalized serving
                      recommendation for the fish in our app.
                    </p>
                  </div>
                </div>
              </div>

              <Form
                action={formAction}
                onSubmitCompleted$={() => {
                  if (formAction.status === 200) {
                    showUserInputModal.value = false;
                  }
                }}
              >
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
                      value={userDetails.data.weight}
                      onChange$={(e) =>
                        (userDetails.data.weight = e.target.value)
                      }
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
                      value={userDetails.data.age}
                      onChange$={(e) => (userDetails.data.age = e.target.value)}
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
                    for="plan_to_get_pregnant"
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Plan to get pregnant?
                  </label>
                  <div class="mt-2">
                    <select
                      id="plan_to_get_pregnant"
                      name="plan_to_get_pregnant"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                      value={plan_to_get_pregnant.value}
                      onChange$={(e) => {
                        userDetails.data.plan_to_get_pregnant = e.target.value;
                        plan_to_get_pregnant.value = e.target.value;
                      }}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
                <div class="my-2">
                  <label class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Portion Size
                  </label>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
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
                            checked={portion.value === userDetails.data.portion}
                            onChange$={(e) =>
                              (userDetails.data.portion = e.target.value)
                            }
                            class="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
                          />
                          <label
                            for={portion.label}
                            class="text-center ml-3 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                          >
                            <img
                              src={`/images/${portion.value}oz.png`}
                              class="w-16 sm:w-20"
                              alt={`Image representing the ${portion.value} oz portion size`}
                            />
                            {portion.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    class="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:col-start-2"
                    onClick$={() => (validating.value = true)}
                  >
                    {validating.value ? <Spinner /> : <span>SAVE</span>}
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
                    onClick$={() => (showUserInputModal.value = false)}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
