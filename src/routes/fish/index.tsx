import { component$, Resource, useResource$ } from "@builder.io/qwik";

interface Fish {
  name: string;
}

export default component$(() => {
  const fishResource = useResource$<Fish[]>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch("https://mcwfishapp.com/fishs/", {
      headers: {
        Authorization: `Token c0934beac2979a5740b175d96aeff4ed4b057860`,
      },
      signal: abortController.signal,
    });
    return res.json();
  });

  return (
    <div>
      <h1 class="text-black">Hello</h1>
      <ul>
        <Resource
          value={fishResource}
          onPending={() => <div>Loading...</div>}
          onResolved={(data) => {
            return (
              <ul>
                {data.map((fish) => (
                  <li>{fish.name}</li>
                ))}
              </ul>
            );
          }}
        />
      </ul>
    </div>
  );
});
