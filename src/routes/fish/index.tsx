import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type Fish from "~/types/Fish";

export default component$(() => {
  const filter = useSignal("");

  const fishResource = useResource$<Fish[]>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch("https://mcwfishapp.com/fishs/", {
      headers: {
        Authorization: `Token c0934beac2979a5740b175d96aeff4ed4b057860`,
      },
      signal: abortController.signal,
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
    // return res.json(); This would serialize all the data from the response in the html
  });

  return (
    <div class="mt-5">
      <input
        class="p-2 m-2 rounded"
        placeholder="Search"
        onInput$={(event) => {
          filter.value = (event.target as HTMLInputElement).value;
        }}
      />
      <ul>
        <Resource
          value={fishResource}
          onPending={() => <div>Loading...</div>}
          onResolved={(data) => {
            return (
              <ul>
                {data
                  .filter(
                    (c) =>
                      c.name.toLowerCase().indexOf(filter.value.toLowerCase()) >
                        -1 ||
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
                          class="w-48"
                        />
                        <a
                          class="text-white underline"
                          href={"/fish/" + fish.id + "/"}
                        >
                          {fish.name}
                        </a>{" "}
                        - {fish.anishinaabe_name} - {fish.lake}
                      </li>
                    </>
                  ))}
              </ul>
            );
          }}
        />
      </ul>
    </div>
  );
});
