import { component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  server$,
} from "@builder.io/qwik-city";
import { getUserDetails, getFetchDetails, getCookie } from "~/helpers";
import type Fish from "~/types/Fish";
import type Recipe from "~/types/Recipe";
import type UserDetails from "~/types/UserDetails";

import NavBack from "~/components/nav-back/nav-back";
import Container from "~/components/container/container";
import EditInput from "~/components/edit-input/edit-input";
import SaveButton from "~/components/save-button/save-button";
import Alert from "~/components/alert/alert";

type FishData = {
  fish_data: Fish;
  recipe_data: Recipe[];
  is_favorite: boolean;
};

export const useFishData = routeLoader$<FishData>(
  async ({ env, params, cookie }) => {
    const { apiKey, domain } = getFetchDetails(env);
    const res = await fetch(`${domain}/v1/fish/${params.fishId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        cookie: `user_id=${cookie.get("user_id")?.value}`,
      },
    });
    return await res.json();
  }
);

export const useUpdateFish = routeAction$(
  async (fishForm, { cookie, env, params }) => {
    const user_id = cookie.get("user_id")?.value;
    const admin = cookie.get("admin")?.value;

    if (!user_id || !admin) {
      return {
        error: true,
        errorText: "You do not have permission to do this.",
      };
    }

    const { domain, apiKey } = getFetchDetails(env);

    const response = await fetch(`${domain}/v1/admin/fish/${params.fishId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        cookie: `user_id=${user_id}`,
      },
      body: JSON.stringify({
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
    mercury: z.string().nonempty(),
    omega_3: z.string().nonempty(),
    omega_3_ratio: z.string().nonempty(),
    pcb: z.string().nonempty(),
    protein: z.string().nonempty(),
  })
);

export const serverDeleteFish = server$(async function (fishId: string) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  let user_id;
  if (this.cookie) {
    user_id = this?.cookie.get("user_id")?.value;
  } else {
    user_id = getCookie("user_id");
  }

  if (!user_id) return;

  const response = await fetch(`${domain}/v1/admin/fish/${fishId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      cookie: `user_id=${user_id}`,
    },
  });

  if (!response.ok) {
    return {
      error: true,
      errorText: `Error: ${response.statusText}`,
    };
  }
  return {
    error: false,
  };
});

export const useUserDetails = routeLoader$<UserDetails>(async ({ cookie }) => {
  return getUserDetails(cookie);
});

export default component$(() => {
  const fishData = useFishData();
  const formAction = useUpdateFish();
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
              successText={"Successfully updated!"}
              failureText={failureText}
              hideAlert={hideAlert}
              success={formSuccess}
            />
          ) : null}
          <NavBack href={"/admin"} text={"admin"} />
          <div class="flex mx-auto mt-8 max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-full">
            <div>
              <h1 class="text-5xl font-extralight flex items-center dark:text-white dark:fill-white">
                {"Edit "}
                {fishData.value.fish_data.name} {"--- "}
                {fishData.value.fish_data.lake}
              </h1>
            </div>
          </div>

          <div class="flex mx-auto mt-2 max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-full justify-between">
            <a
              href={`/admin/fish-type/${fishData.value.fish_data.fish_type_id}`}
            >
              <button
                type="button"
                class="inline-flex items-center text-sm justify-center rounded-md bg-teal-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Edit fish type
              </button>
            </a>
          </div>
          <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-2 sm:px-6 lg:max-w-full text-gray-300 dark:text-gray-600">
            <div class="space-y-2 w-full">
              <div>All fields required. Enter 0 if value is unknown.</div>
            </div>
          </div>
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
              <EditInput
                value={fishData.value.fish_data.mercury}
                type={"mercury"}
              />
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
              <EditInput
                value={fishData.value.fish_data.omega_3}
                type={"omega_3"}
              />
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
              <EditInput
                value={fishData.value.fish_data.omega_3_ratio}
                type={"omega_3_ratio"}
              />
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
              <EditInput value={fishData.value.fish_data.pcb} type={"pcb"} />
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
              <EditInput
                value={fishData.value.fish_data.protein}
                type={"protein"}
              />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.protein}
                </div>
              )}
            </div>
          </Container>
          <div class="divide-y divide-gray-200 pt-6">
            <div class="flex justify-between">
              <div class="mt-4 flex justify-end items-center gap-x-3 px-4 sm:px-6">
                <a
                  class="inline-flex justify-center text-red-700 px-3 py-2 font-semibold hover:text-red-600 cursor-pointer"
                  onClick$={async () => {
                    if (
                      confirm("Are you sure you'd like to delete this fish?")
                    ) {
                      const res = await serverDeleteFish(
                        fishData.value.fish_data.fish_id
                      );
                      if (!res?.error) {
                        window.location.assign("/admin/");
                      }
                    }
                  }}
                >
                  Delete Fish
                </a>
              </div>
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
          </div>
        </Form>
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const fish = resolveValue(useFishData);
  return {
    title: `Edit: ${fish.fish_data.anishinaabe_name || fish.fish_data.name}`,
    meta: [
      {
        name: "description",
        content: `Learn the nutritional details of a ${fish.fish_data.name}`,
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};
