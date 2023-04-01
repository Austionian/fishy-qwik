import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAPIKey from "~/helpers/getAPIKey";

interface Fish {
  id: string;
  name: string;
  anishinaabe_name: string;
  lake: string;
  fish_image: string;
}

export const useFishData = routeLoader$<Fish>(async ({ env, params }) => {
  const apiKey = getAPIKey(env);
  const res = await fetch(
    `https://fishy-edge-tvp4i.ondigitalocean.app/v1/fish/${params.fishId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return await res.json();
});

export default component$(() => {
  const fishData = useFishData();
  return (
    <div class="m-5 h-96">
      <h1 class="text-white my-5 font-bold text-3xl">
        {fishData.value.anishinaabe_name ? (
          <>
            {fishData.value.anishinaabe_name}
            <span class="text-black text-xs pl-2">[{fishData.value.name}]</span>
          </>
        ) : (
          fishData.value.name
        )}
      </h1>
      <img class="h-full" src={`/images/${fishData.value.fish_image}`} />
      <a href={`/fish/${fishData.value.id}/edit`}>[Edit]</a>
    </div>
  );
});
