import { component$ } from "@builder.io/qwik";
import { zod$, z, Form, routeAction$ } from "@builder.io/qwik-city";

export const useSignUpFormAction = routeAction$(
  async (signUpForm, { url, redirect, cookie }) => {
    const email = signUpForm.email;
    // const response = await fetch("https://mcwfishapp.com/update", {
    //   body: email,
    // }).then((res) => res.json());
    if (email !== "austin@austin.com") {
      return {
        success: false,
        fieldErrors: {
          email: "Unable to register new user",
        },
      };
    }
    cookie.set("fish-login", "true", {
      path: "/",
    });
    const redirectUrl = new URL(url).searchParams.get("redirect") || "/fish/";
    throw redirect(303, redirectUrl);
  },
  zod$({
    email: z.string().email().nonempty(),
  })
);

export default component$(() => {
  const action = useSignUpFormAction();

  return (
    <Form action={action}>
      <label>email</label>
      <br />
      <input type="text" name="email" placeholder="email" />
      {!action.value?.success && <div>{action.value?.fieldErrors?.email}</div>}
      <br />
      <br />
      <button type="submit">Submit</button>
    </Form>
  );
});
