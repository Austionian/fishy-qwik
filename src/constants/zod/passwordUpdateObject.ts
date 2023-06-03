import { z } from "@builder.io/qwik-city";

export const passwordUpdateObject = z
  .object({
    current_password: z.string(),
    new_password: z.string().min(7),
    confirm_password: z.string().min(7),
  })
  .superRefine(({ confirm_password, new_password }, ctx) => {
    if (confirm_password !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
      });
    }
  });
