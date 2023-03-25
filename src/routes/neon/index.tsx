import { component$, Resource, useResource$ } from "@builder.io/qwik";

interface Fish {
  name: string;
}

export default component$(() => {
  const fishResource = useResource$<Fish[]>(async ({ cleanup }) => {
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(
      "https://fishy-edge-tvp4i.ondigitalocean.app/api/fishs",
      {
        signal: abortController.signal,
      }
    );
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
                {data.map((fish, i) => (
                  <li key={i}>{fish.name}</li>
                ))}
              </ul>
            );
          }}
        />
      </ul>
    </div>
  );
});
