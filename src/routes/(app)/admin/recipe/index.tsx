import { component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  Form,
  zod$,
  z,
} from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

import Container from "~/components/container/container";
import EditInput from "~/components/edit-input/edit-input";
import NavBack from "~/components/nav-back/nav-back";
import SaveCancel from "~/components/save-cancel/save-cancel";
import Alert from "~/components/alert/alert";

export const useNewRecipe = routeAction$(
  async (recipeForm, { cookie, env }) => {
    const user_id = cookie.get("user_id")?.value;
    const admin = cookie.get("admin")?.value;

    if (!user_id || !admin) {
      return {
        error: true,
        errorText: "You do not have permission to do this.",
      };
    }

    const name = recipeForm.name;
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

    const response = await fetch(`${domain}/v1/admin/recipe/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        cookie: `user_id=${user_id}`,
      },
      body: JSON.stringify({
        user_id,
        name,
        ingredients: parsedIngredients,
        steps: parsedSteps,
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
    ingredient: z.string().array().nonempty(),
    step: z.string().array().nonempty(),
  })
);

export default component$(() => {
  const additionalIngredients = useSignal(0);
  const additionalSteps = useSignal(0);
  const validating = useSignal(false);
  const saveValue = useSignal("Save");
  const formAction = useNewRecipe();
  const hideAlert = useSignal(true);
  const formSuccess = useSignal(true);
  const failureText = useSignal("");

  return (
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
              console.log("here");
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
              <EditInput type={"name"} />
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
                for="ingredient"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Ingredients
              </label>
            </div>
            <div class="px-5 pb-2">
              <EditInput type={"ingredient"} isArray />
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
              <EditInput type={"step"} isArray />
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

          <SaveCancel
            validating={validating}
            saveValue={saveValue}
            cancelHref={"/admin"}
          />
        </Form>
      </main>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "New Recipe",
    meta: [
      {
        name: "description",
        content: "Create a new recipe",
      },
    ],
  };
};
