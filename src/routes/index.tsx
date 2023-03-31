import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";

export const useFishData = routeLoader$<Fish[]>(async () => {
  const apiKey = "c0934beac2979a5740b175d96aeff4ed4b057860";
  const res = await fetch("https://mcwfishapp.com/fishs/", {
    headers: {
      Authorization: `Token ${apiKey}`,
    },
  });
  const data = await res.json();
  return data.map((fish: Fish) => ({
    id: fish.id,
    name: fish.name,
    anishinaabe_name: fish.anishinaabe_name,
    lake: fish.lake,
    fish_data: {
      fish_image: fish.fish_data.fish_image.replace(".png", ".webp"),
    },
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
                  src={`/images/${fish.fish_data.fish_image}`}
                  alt={fish.name}
                  class="w-48 h-36"
                />
                <a class="text-white underline" href={"/fish/" + fish.id + "/"}>
                  {fish.name}
                </a>{" "}
                - {fish.anishinaabe_name} - {fish.lake}
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
