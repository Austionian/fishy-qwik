import { component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeLoader$,
  routeAction$,
  zod$,
  z,
} from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

import NavBack from "~/components/nav-back/nav-back";
import Container from "~/components/container/container";
import EditInput from "~/components/edit-input/edit-input";
import SaveButton from "~/components/save-button/save-button";
import Alert from "~/components/alert/alert";

type FishData = {
  id: string;
  name: string;
  anishinaabe_name: string;
  about: string;
};

const LAKE_VALUES = ["Michigan", "Huron", "Superior", "Store"];

export const useFishData = routeLoader$<FishData[]>(async ({ env, cookie }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/admin/fish_type/`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      cookie: `user_id=${cookie.get("user_id")?.value}`,
    },
  });
  return await res.json();
});

export const useSaveFish = routeAction$(
  async (fishForm, { cookie, env }) => {
    const user_id = cookie.get("user_id")?.value;
    const admin = cookie.get("admin")?.value;

    if (!user_id || !admin) {
      return {
        error: true,
        errorText: "You do not have permission to do this.",
      };
    }

    const { domain, apiKey } = getFetchDetails(env);

    const response = await fetch(`${domain}/v1/admin/fish/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        cookie: `user_id=${user_id}`,
      },
      body: JSON.stringify({
        fish_type_id: fishForm.fish_type,
        lake: fishForm.lake,
        mercury: Number.parseFloat(fishForm.mercury),
        omega_3: Number.parseFloat(fishForm.omega_3),
        omega_3_ratio: Number.parseFloat(fishForm.omega_3_ratio),
        pcb: Number.parseFloat(fishForm.pcb),
        protein: Number.parseFloat(fishForm.protein),
      }),
    });

    if (!response.ok) {
      return {
        error: true,
        errorText: `Error: ${response.statusText}`,
      };
    }
  },
  zod$({
    fish_type: z.string().nonempty(),
    lake: z.string().nonempty(),
    mercury: z.string().nonempty(),
    omega_3: z.string().nonempty(),
    omega_3_ratio: z.string().nonempty(),
    pcb: z.string().nonempty(),
    protein: z.string().nonempty(),
  })
);

export default component$(() => {
  const fishData = useFishData();
  const formAction = useSaveFish();
  const saveValue = useSignal("Save");
  const validating = useSignal(false);
  const formSuccess = useSignal(true);
  const failureText = useSignal("");
  const hideAlert = useSignal(true);

  return (
    <div class="min-h-full">
      <main class="pb-10">
        <Form
          action={formAction}
          onSubmitCompleted$={() => {
            validating.value = false;
            if (!formAction.value?.error && !formAction.value?.failed) {
              saveValue.value = `\u2713`;
            } else {
              formSuccess.value = false;
              failureText.value =
                formAction.value?.errorText || "Unable to complete request.";
            }
            hideAlert.value = false;
          }}
        >
          {!hideAlert.value ? (
            <Alert
              successText={"Successfully saved!"}
              failureText={failureText}
              hideAlert={hideAlert}
              success={formSuccess}
            />
          ) : null}
          <NavBack href={"/admin"} text={"admin"} />
          <div class="flex mx-auto mt-8 max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-full justify-between">
            <div>
              <h1 class="text-5xl font-extralight flex items-center dark:text-white dark:fill-white">
                Add New Fish
              </h1>
            </div>
          </div>

          <Container>
            <div class="flex justify-between">
              <div class="w-[50%]">
                <div class="px-4 py-2 sm:px-6 pt-6">
                  <label
                    for="fish_type"
                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Fish Type
                  </label>
                  <select
                    id="fish_type"
                    name="fish_type"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  >
                    {fishData.value.map((type, i) => (
                      <option key={i} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="px-4 py-2 sm:px-6 pb-6">
                  <label
                    for="lake"
                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Lake
                  </label>
                  <select
                    id="lake"
                    name="lake"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                  >
                    {LAKE_VALUES.map((lake, i) => (
                      <option key={i}>{lake}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="flex align-middle place-self-center mr-4 sm:mr-6">
                <a href="/admin/fish-type/">
                  <button
                    type="button"
                    class="inline-flex items-center text-sm justify-center rounded-md bg-teal-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Create new fish type
                  </button>
                </a>
              </div>
            </div>
          </Container>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="mercury"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Mercury
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"mercury"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.mercury}
                </div>
              )}
            </div>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="omega_3"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Omega 3
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"omega_3"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.omega_3}
                </div>
              )}
            </div>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="omega_3_ratio"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Omega 3 Ratio
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"omega_3_ratio"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.omega_3_ratio}
                </div>
              )}
            </div>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="pcb"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                PCB
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"pcb"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.pcb}
                </div>
              )}
            </div>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="protein"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Protein
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"protein"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.protein}
                </div>
              )}
            </div>
          </Container>

          <div class="divide-y divide-gray-200 pt-6">
            <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
              <a href="/">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10 dark:hover:text-white dark:ring-white/10"
                >
                  Cancel
                </button>
              </a>
              <SaveButton saveValue={saveValue} validating={validating} />
            </div>
          </div>
        </Form>
      </main>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: `Create new fish`,
  };
};
