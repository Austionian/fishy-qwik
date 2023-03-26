import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import {
  useLocation,
  zod$,
  z,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import type Fish from "~/types/Fish";

// export const onPost: RequestHandler<FishForm> = async ({ request }) => {
//   const formData = await request.formData();
//   const fish: Fish = {
//     id: formData.get("id") as string,
//     name: formData.get("name") as string,
//     anishinaabe_name: formData.get("anishinaabe_name") as string,
//     fish_data: {
//       fish_image: formData.get("fish_image") as string,
//     },
//   };
//   const data: FishForm = {
//     fish: fish,
//     errors: {},
//   };
//   isValid(fish, "name", data.errors);
//   return data;
// };
//
// function isValid(
//   fish: Fish,
//   field: keyof Fish,
//   errors: Record<string, string>
// ) {
//   if (!fish[field]) {
//     errors[field] = "Required";
//   }
// }
//
export const useFishFormAction = routeAction$(
  async (fish) => {
    const name = fish.name;
    const response = await fetch("https://mcwfishapp.com/update").then((res) =>
      res.json()
    );
    if (!response.success) {
      return {
        success: false,
        fieldErrors: {
          name: response.message,
        },
      };
    }
    return {
      success: true,
      name,
    };
  },
  zod$({
    name: z.string().nonempty(),
  })
);

export default component$(() => {
  const fishResource = useResource$<Fish[]>(async ({ track, cleanup }) => {
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
      fish_data: {
        fish_image: fish.fish_data.fish_image.replace(".png", ".webp"),
      },
    }));
    // return res.json(); This would serialize all the data from the response in the html
  });

  const loc = useLocation();
  const name = useSignal("");
  const action = useFishFormAction();
  return (
    <Form action={action}>
      <div class="m-5">
        <Resource
          value={fishResource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Error...</div>}
          onResolved={(data) => {
            const fish = data.filter((fish) => fish.id == loc.params.fishId);
            return (
              <>
                <input
                  class="my-5 text-3xl"
                  placeholder={fish[0].anishinaabe_name}
                  bind:value={name}
                  name="name"
                />
                {action.value?.fieldErrors?.name && (
                  <div>{action.value.fieldErrors.name}</div>
                )}
                {action.value?.success && <div>Fish updated successfully!</div>}
                <img src={`/images/${fish[0].fish_data.fish_image}`} />
              </>
            );
          }}
        />
        <a href={`/fish/${loc.params.fishId}`}>[Cancel]</a>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
});
