import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getFetchDetails } from "~/helpers";

import Error from "~/components/error/error";

type Fish = {
  id: string;
  name: string;
  anishinaabe_name: string;
};

type Recipe = {
  id: string;
  name: string;
};

type Favorites = {
  fishs: Fish[];
  recipes: Recipe[];
};

type ErrorType = {
  errorMessage?: string;
};

export const useFavoriteData = routeLoader$<Favorites & ErrorType>(
  async ({ env, fail, cookie }) => {
    const { apiKey, domain } = getFetchDetails(env);
    const user_id = cookie.get("user_id")?.value;
    const res = await fetch(`${domain}/v1/favorite/`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        cookie: `user_id=${user_id}`,
      },
    });
    try {
      return await res.json();
    } catch {
      return fail(500, {
        errorMessage: "Unable to complete current request.",
      });
    }
  }
);

export default component$(() => {
  const favorites = useFavoriteData();

  if (favorites.value.errorMessage) {
    return <Error message={favorites.value.errorMessage} />;
  }

  return (
    <div>
      <h1 class="text-3xl">Fish</h1>
      {favorites.value.fishs.map((fish, i) => (
        <div key={`fish-${i}`}>
          <a href={`/fish/type/${fish.id}`}>{fish.name}</a>
        </div>
      ))}
      <h1 class="text-3xl">Recipes</h1>
      {favorites.value.recipes.map((recipe, i) => (
        <div key={`recipe-${i}`}>
          <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
        </div>
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Favorites",
  meta: [
    {
      name: "description",
      content: "Favorited fish and recipes in the Gigiigoo app.",
    },
  ],
};
