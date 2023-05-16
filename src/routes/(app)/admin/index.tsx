import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <h1>Hello</h1>;
});

export const head: DocumentHead = ({ params }) => {
  return {
    title: "Admin",
    meta: [
      {
        name: "description",
        content: "Admins only area.",
      },
      {
        name: "id",
        content: params.fishId,
      },
    ],
  };
};
