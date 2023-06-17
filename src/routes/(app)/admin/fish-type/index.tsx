import {
  $,
  component$,
  type QwikChangeEvent,
  useSignal,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeAction$,
  zod$,
  z,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";
import { v4 as uuidv4 } from "uuid";

import NavBack from "~/components/nav-back/nav-back";
import Container from "~/components/container/container";
import EditInput from "~/components/edit-input/edit-input";
import SaveButton from "~/components/save-button/save-button";
import Alert from "~/components/alert/alert";
import { serverHandleUpload } from "~/services/serverPresign";
import type Recipe from "~/types/Recipe";
import InputContainer from "~/components/input-container/input-container";

export const useRecipeData = routeLoader$<Recipe[]>(async ({ env }) => {
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/recipe/`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return await res.json();
});

export const useSaveFishType = routeAction$(
  async (fishTypeForm, { cookie, env }) => {
    const user_id = cookie.get("user_id")?.value;
    const admin = cookie.get("admin")?.value;

    if (!user_id || !admin) {
      return {
        error: true,
        errorText: "You do not have permission to do this.",
      };
    }

    const { domain, apiKey } = getFetchDetails(env);

    const response = await fetch(`${domain}/v1/admin/fish_type/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        cookie: `user_id=${user_id}`,
      },
      body: JSON.stringify({
        name: fishTypeForm.name,
        anishinaabe_name: fishTypeForm.anishinaabe_name,
        fish_image: fishTypeForm.fish_image,
        woodland_fish_image: fishTypeForm.woodland_fish_image,
        about: fishTypeForm.about,
        recipe: fishTypeForm.recipe,
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
    name: z.string().nonempty(),
    anishinaabe_name: z.string().optional(),
    fish_image: z.string().nonempty(),
    woodland_fish_image: z.string().optional(),
    about: z.string().nonempty(),
    recipe: z.string().array().optional(),
  })
);

export default component$(() => {
  const recipeData = useRecipeData();
  const formAction = useSaveFishType();
  const saveValue = useSignal("Save");
  const validating = useSignal(false);
  const formSuccess = useSignal(true);
  const failureText = useSignal("");
  const hideAlert = useSignal(true);
  const savingImage = useSignal(false);
  const savingWoodlandImage = useSignal(false);

  const fishImage = useSignal<string>();
  const woodlandImage = useSignal<string>();

  const handleUpload = $(
    async (
      e: QwikChangeEvent<HTMLInputElement>,
      woodlandImageFlag: boolean
    ) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const fileName = `${uuidv4()}-${file.name}`;

        serverHandleUpload(fileName).then((res) => {
          if (file) {
            fetch(res.url, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            })
              .then((res) => {
                if (res.status === 200) {
                  e.target.blur;
                  const imageUrl = `https://mcwfishapp.s3.us-east-2.amazonaws.com/${fileName}`;
                  if (woodlandImageFlag) {
                    woodlandImage.value = imageUrl;
                  } else {
                    fishImage.value = imageUrl;
                  }
                }
              })
              .catch((err) => console.error("err: ", err));
          }
        });
      }
    }
  );

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
                Add New Fish Type
              </h1>
            </div>
          </div>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Name
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"name"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.name}
                </div>
              )}
            </div>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="anishinaabe_name"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Anishinaabe Name
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"anishinaabe_name"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.anishinaabe_name}
                </div>
              )}
            </div>
            <div class="w-full sm:w-[55%] pr-5 sm:pr-0">
              <div class="px-4 py-2 sm:px-6 pt-6">
                <label
                  for="recipe"
                  class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Recipes
                </label>
              </div>
              <div class="pl-5 pb-2">
                <InputContainer>
                  <div class="h-72 overflow-y-scroll overflow-x-hidden rounded-lg pr-4 pl-2 ring-1 ring-gray-300 dark:ring-white/10 dark:bg-white/5">
                    {recipeData.value.map((recipe, i) => (
                      <div
                        class="relative flex items-start py-1"
                        key={`recipe-${i}`}
                      >
                        <div class="min-w-0 flex-1 sm:text-sm leading-6">
                          <label
                            for={recipe.name}
                            class="select-none text-gray-900 dark:text-gray-100 cursor-pointer"
                          >
                            {recipe.name}
                          </label>
                        </div>
                        <div class="ml-3 flex h-6 items-center">
                          <input
                            id={recipe.name}
                            name="recipe[]"
                            type="checkbox"
                            value={recipe.id}
                            class="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {formAction.value?.failed && (
                    <div class="text-left text-red-600 text-sm">
                      {formAction.value?.fieldErrors?.recipe}
                    </div>
                  )}
                </InputContainer>
              </div>
            </div>

            <div class="px-4 py-2 sm:px-6">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                About
              </label>
            </div>
            <div class="px-5 pb-2">
              <InputContainer>
                <textarea
                  name="about"
                  id="about"
                  class="block text-sm w-full h-56 my-2 rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                />
              </InputContainer>
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.about}
                </div>
              )}
            </div>
          </Container>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="fish_image"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Fish Image
              </label>
              <div class="mt-2">
                <div class="flex items-center">
                  <div class="inline-block h-44 flex-shrink-0">
                    <img class="h-full" src={fishImage.value} alt="" />
                  </div>
                  <div class="relative ml-5">
                    <input
                      id="fish_image"
                      name="fish_image_container"
                      type="file"
                      class="peer absolute h-full w-full rounded-md opacity-0 cursor-pointer"
                      onChange$={async (e) => {
                        savingImage.value = true;
                        await handleUpload(e, false);
                        savingImage.value = false;
                      }}
                    />
                    {formAction.value?.failed && (
                      <div class="text-left text-red-600 text-sm">
                        {formAction.value?.fieldErrors?.fish_image}
                      </div>
                    )}
                    <label
                      for="fish_image"
                      class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-teal-500"
                    >
                      {savingImage.value ? (
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 38 38"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#fff"
                          class="h-5 w-5"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <g transform="translate(1 1)" stroke-width="2">
                              <circle
                                stroke-opacity=".5"
                                cx="18"
                                cy="18"
                                r="18"
                              />
                              <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 18 18"
                                  to="360 18 18"
                                  dur="0.7s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </g>
                          </g>
                        </svg>
                      ) : (
                        <span>Upload</span>
                      )}
                      <span class="sr-only"> fish image</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="about"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Woodland Fish Image
              </label>
              <div class="mt-2">
                <div class="flex items-center">
                  <div class="inline-block h-44 flex-shrink-0">
                    <img class="h-full" src={woodlandImage.value} alt="" />
                  </div>
                  <div class="relative ml-5">
                    <input
                      id="woodland_fish_image"
                      name="woodland_fish_image_container"
                      type="file"
                      class="peer absolute h-full w-full rounded-md opacity-0 cursor-pointer"
                      onChange$={async (e) => {
                        savingWoodlandImage.value = true;
                        await handleUpload(e, true);
                        savingWoodlandImage.value = false;
                      }}
                    />
                    {formAction.value?.failed && (
                      <div class="text-left text-red-600 text-sm">
                        {formAction.value?.fieldErrors?.woodland_fish_image}
                      </div>
                    )}
                    <label
                      for="woodland_fish_image"
                      class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-teal-500"
                    >
                      {savingWoodlandImage.value ? (
                        <svg
                          width="38"
                          height="38"
                          viewBox="0 0 38 38"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#fff"
                          class="h-5 w-5"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <g transform="translate(1 1)" stroke-width="2">
                              <circle
                                stroke-opacity=".5"
                                cx="18"
                                cy="18"
                                r="18"
                              />
                              <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 18 18"
                                  to="360 18 18"
                                  dur="0.7s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </g>
                          </g>
                        </svg>
                      ) : (
                        <span>Upload</span>
                      )}
                      <span class="sr-only"> woodland fish image</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <input hidden name="fish_image" value={fishImage.value} />
          <input
            hidden
            name="woodland_fish_image"
            value={woodlandImage.value}
          />

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
