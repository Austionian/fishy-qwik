import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";

export const useFishApi = routeLoader$(
  async () => "c0934beac2979a5740b175d96aeff4ed4b057860"
);

export default component$(() => {
  const apiKey = useFishApi();
  const fishResource = useResource$<Fish[]>(async () => {
    if (isServer) {
      const res = await fetch("https://mcwfishapp.com/fishs/", {
        headers: {
          Authorization: `Token ${apiKey.value}`,
        },
      });
      const data = await res.json();
      return data.map((fish: Fish) => ({
        id: fish.id,
        name: fish.name,
        anishinaabe_name: fish.anishinaabe_name,
        fish_data: {
          fish_image: fish.fish_data.fish_image.replace(".png", ".webp"),
        },
      }));
    }

    // return res.json(); This would serialize all the data from the response in the html
  });

  const loc = useLocation();
  return (
    <div class="m-5">
      <Resource
        value={fishResource}
        onPending={() => <div>Loading...</div>}
        onResolved={(data) => {
          const fish = data.filter((fish) => fish.id == loc.params.fishId);
          return (
            <>
              <h1 class="text-white my-5 font-bold text-3xl">
                {fish[0].anishinaabe_name ? (
                  <>
                    {fish[0].anishinaabe_name}
                    <span class="text-black text-xs pl-2">
                      [{fish[0].name}]
                    </span>
                  </>
                ) : (
                  fish[0].name
                )}
              </h1>
              <img src={`/images/${fish[0].fish_data.fish_image}`} />
            </>
          );
        }}
      />
      <a href={`/fish/${loc.params.fishId}/edit`}>[Edit]</a>
    </div>
  );
});
