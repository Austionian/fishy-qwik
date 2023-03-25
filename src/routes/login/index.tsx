import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <form>
      <label>email</label>
      <input type="text" name="email" />
    </form>
  );
});
