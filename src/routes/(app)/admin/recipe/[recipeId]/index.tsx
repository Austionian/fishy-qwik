import { $, component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  Form,
  zod$,
  z,
  server$,
} from "@builder.io/qwik-city";
import { getCookie, getFetchDetails } from "~/helpers";
import { v4 as uuidv4 } from "uuid";
import { serverHandleUpload } from "~/services/serverPresign";
import type Recipe from "~/types/Recipe";

import Container from "~/components/container/container";
import EditInput from "~/components/edit-input/edit-input";
import NavBack from "~/components/nav-back/nav-back";
import Alert from "~/components/alert/alert";
import SaveButton from "~/components/save-button/save-button";
import Spinner from "~/components/spinner/spinner";

type RecipeLoader = {
  data: Recipe;
  is_favorite: boolean;
  error: boolean;
};

export const useRecipeData = routeLoader$<RecipeLoader>(
  async ({ env, params, cookie }) => {
    const { apiKey, domain } = getFetchDetails(env);
    const res = await fetch(`${domain}/v1/recipe/${params.recipeId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        cookie: `user_id=${cookie.get("user_id")?.value}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    return {
      error: true,
    };
  },
);

export const serverDeleteRecipe = server$(async function (recipeId: string) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  let user_id;
  if (this.cookie) {
    user_id = this?.cookie.get("user_id")?.value;
  } else {
    user_id = getCookie("user_id");
  }

  if (!user_id) return;

  const response = await fetch(`${domain}/v1/admin/recipe/${recipeId}`, {
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

export const serverSaveFishImageToDB = server$(async function (
  recipe_id: string,
  image_url: string,
) {
  const { domain, apiKey } = getFetchDetails(this?.env);
  const user_id = this?.cookie.get("user_id")?.value;

  if (!user_id) return;

  const response = await fetch(`${domain}/v1/admin/recipe/${recipe_id}/image`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      cookie: `user_id=${user_id}`,
    },
    body: JSON.stringify({
      image_url,
    }),
  });

  if (!response.ok) {
    return {
      error: true,
      errorText: `Error: ${response.statusText}`,
    };
  }
});

export const useUpdateRecipe = routeAction$(
  async (recipeForm, { cookie, env, params }) => {
    const user_id = cookie.get("user_id")?.value;
    const admin = cookie.get("admin")?.value;

    if (!user_id || !admin) {
      return {
        error: true,
        errorText: "You do not have permission to do this.",
      };
    }

    const name = recipeForm.name;
    const image_url = recipeForm.recipe_image;
    const ingredients = recipeForm.ingredient;
    const parsedIngredients: string[] = [];
    const steps = recipeForm.step;
    const parsedSteps: string[] = [];

    ingredients.forEach((ingredient) => {
      if (ingredient && ingredient !== "") {
        parsedIngredients.push(ingredient);
      }
    });

    steps.forEach((step) => {
      if (step && step !== "") {
        parsedSteps.push(step);
      }
    });

    const { domain, apiKey } = getFetchDetails(env);

    const response = await fetch(
      `${domain}/v1/admin/recipe/${params.recipeId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          cookie: `user_id=${user_id}`,
        },
        body: JSON.stringify({
          name,
          image_url,
          ingredients: parsedIngredients,
          steps: parsedSteps,
        }),
      },
    );

    if (!response.ok) {
      return {
        error: true,
        errorText: `Error: ${response.statusText}`,
      };
    }
  },
  zod$({
    name: z.string().min(1),
    recipe_image: z.string(),
    ingredient: z.string().array().nonempty(),
    step: z.string().array().nonempty(),
  }),
);

export default component$(() => {
  const recipeData = useRecipeData();
  const additionalIngredients = useSignal(0);
  const additionalSteps = useSignal(0);
  const validating = useSignal(false);
  const saveValue = useSignal("Save");
  const formAction = useUpdateRecipe();
  const hideAlert = useSignal(true);
  const formSuccess = useSignal(true);
  const failureText = useSignal("");
  const validatingImage = useSignal(false);

  const recipeImage = useSignal(
    recipeData.value.data.image_url ? recipeData.value.data.image_url : "",
  );

  const handleUpload = $(async (e: Event, recipe_id: string) => {
    validatingImage.value = true;
    const t = e.target as HTMLInputElement;
    if (t?.files) {
      const file = t.files[0];
      const fileName = `${uuidv4()}-${file.name}`;

      if (file) {
        const res = await serverHandleUpload(fileName);

        const s3_res = await fetch(res.url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (s3_res.status === 200) {
          t.blur;
          const imageUrl = `https://mcwfishapp.s3.us-east-2.amazonaws.com/${fileName}`;
          recipeImage.value = imageUrl;
          serverSaveFishImageToDB(recipe_id, imageUrl);
        }
      }
    }
    validatingImage.value = false;
  });

  return recipeData.value.error ? (
    <div>ERROR PROCESSING REQUEST</div>
  ) : (
    <div class="min-h-full">
      <main class="pb-10">
        <NavBack href={"/admin"} text={"admin"} />
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
            additionalSteps.value = 0;
            additionalIngredients.value = 0;
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
          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="Name"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Name
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput value={recipeData.value.data.name} type={"name"} />
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.name}
                </div>
              )}
            </div>
          </Container>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="recipe_image"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Recipe Image{" "}
                <p class="text-xs text-gray-500 dark:text-gray-300">
                  If no image given, random image will be supplied when the
                  recipe is loaded.
                </p>
              </label>
              <div class="mt-2">
                <div class="flex items-center">
                  <div class="inline-block h-44 flex-shrink-0">
                    <img class="h-full" src={recipeImage.value} alt="" />
                  </div>
                  <div class="relative ml-5">
                    <input
                      id="recipe_image"
                      name="recipe_image"
                      type="file"
                      class="peer absolute h-full w-full rounded-md opacity-0 cursor-pointer"
                      value={recipeImage.value}
                      onChange$={(e) => {
                        handleUpload(e, recipeData.value.data.id);
                      }}
                    />
                    <label
                      for="recipe_image"
                      class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-teal-500"
                    >
                      {validatingImage.value ? (
                        <Spinner />
                      ) : (
                        <>
                          <span>Change</span>
                          <span class="sr-only"> recipe image</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container>
            <div class="px-4 py-2 sm:px-6">
              <label
                for="ingredient"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Ingredients
              </label>
            </div>
            <div class="px-5 pb-2">
              {recipeData.value.data.ingredients.map((ingredient, i) => (
                <EditInput
                  key={`${i}-ingredient`}
                  value={ingredient}
                  type={"ingredient"}
                  isArray
                />
              ))}
              {[...Array(additionalIngredients.value)].map((_, i) => (
                <EditInput
                  key={`${i}-additional-ingredient`}
                  type={"ingredient"}
                  isArray
                />
              ))}
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.ingredient}
                </div>
              )}
              <button
                class="inline-flex mt-6 justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:col-start-2"
                onClick$={() => additionalIngredients.value++}
                type="button"
              >
                Add another ingredient
              </button>
            </div>
          </Container>

          <Container>
            <div class="px-4 py-5 sm:px-6">
              <label
                for="step"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Preparation Steps
              </label>
            </div>
            <div class="px-5 pb-2">
              {recipeData.value.data.steps.map((step, i) => (
                <EditInput
                  key={`${i}-step`}
                  value={step}
                  type={"step"}
                  isArray
                />
              ))}
              {[...Array(additionalSteps.value)].map((_, i) => (
                <EditInput key={`${i}-additional-step`} type={"step"} isArray />
              ))}
              {formAction.value?.failed && (
                <div class="text-left text-red-600 text-sm">
                  {formAction.value?.fieldErrors?.step}
                </div>
              )}
              <button
                class="inline-flex mt-6 justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:col-start-2"
                onClick$={() => additionalSteps.value++}
                type="button"
              >
                Add another preparation step
              </button>
            </div>
          </Container>

          <div class="divide-y divide-gray-200 pt-6">
            <div class="flex justify-between">
              <div class="mt-4 flex justify-end items-center gap-x-3 px-4 sm:px-6">
                <a
                  class="inline-flex justify-center text-red-700 px-3 py-2 font-semibold hover:text-red-600 cursor-pointer"
                  onClick$={async () => {
                    if (
                      confirm("Are you sure you'd like to delete this recipe?")
                    ) {
                      const res = await serverDeleteRecipe(
                        recipeData.value.data.id,
                      );
                      if (!res?.error) {
                        window.location.assign("/admin/");
                      }
                    }
                  }}
                >
                  Delete Recipe
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
  const recipe = resolveValue(useRecipeData);
  return {
    title: `Edit: ${recipe.data.name}`,
    meta: [
      {
        name: "description",
        content: `Edit the ingredients and steps of ${recipe.data.name}`,
      },
      {
        name: "id",
        content: params.recipeId,
      },
    ],
  };
};
