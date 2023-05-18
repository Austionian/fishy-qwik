import { z } from "@builder.io/qwik-city";

export const passwordUpdateObject = z
  .object({
    password: z.string().min(7),
    confirmPassword: z.string().min(7),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
      });
    }
  });
