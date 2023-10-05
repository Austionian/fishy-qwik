import { z } from "@builder.io/qwik-city";
import { PORTION_VALUES } from "../portions";

export const userDetailsObject = z.object({
  weight: z.coerce
    .number()
    .min(1, { message: "Weight must be at least 1." })
    .max(350, { message: "Weight cannot be more than 350." }),
  age: z.coerce.number().min(1).max(100),
  plan_to_get_pregnant: z.enum(["true", "false"]).optional(),
  portion: z.enum(PORTION_VALUES),
});
