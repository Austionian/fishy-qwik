import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";

interface Fish {
  id: string;
  fish_id: string;
  name: string;
  anishinaabe_name: string;
  lake: string;
  fish_image: string;
}

export const useFishData = routeLoader$<Fish[]>(async ({ env }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    "https://fishy-edge-tvp4i.ondigitalocean.app/v1/fishs",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await res.json();
  return data.map((fish: Fish) => ({
    id: fish.id,
    fish_id: fish.fish_id,
    name: fish.name,
    anishinaabe_name: fish.anishinaabe_name || "",
    lake: fish.lake,
    fish_image: fish.fish_image.replace(".png", ".webp"),
  }));
});

export default component$(() => {
  const fishData = useFishData();
  const filter = useSignal("");

  return (
    <div class="mt-5">
      <input
        class="p-2 m-2 rounded"
        placeholder="Search"
        onInput$={(event) => {
          filter.value = (event.target as HTMLInputElement).value;
        }}
        autoFocus
      />
      <ul>
        {fishData.value
          .filter(
            (c) =>
              c.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
              c.anishinaabe_name
                .toLowerCase()
                .indexOf(filter.value.toLowerCase()) > -1
          )
          .map((fish) => (
            <>
              <li class="border-solid border-2 border-sky-500 p-5 my-5">
                <img
                  src={`/images/${fish.fish_image}`}
                  alt={fish.name}
                  class="min-w-48 h-36"
                />
                <a
                  class="text-white underline font-bold"
                  href={"/fish/" + fish.fish_id + "/"}
                >
                  {!!fish.anishinaabe_name ? fish.anishinaabe_name : fish.name}
                </a>
                <span class="text-sm">
                  {!!fish.anishinaabe_name ? ` ${fish.name}` : null}
                </span>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Gigiigoo App",
  meta: [
    {
      name: "description",
      content:
        "Learn healthy, personalized fish portions and nutritional contents",
    },
  ],
};
