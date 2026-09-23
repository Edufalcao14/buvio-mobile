import { z } from "zod";
import { t } from "@/i18n";

export const userInputSchema = z.object({
  code: z
    .string()
    .length(5, {
      message: t("validation.codeLength"),
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: t("validation.codeAlnum"),
    })
    .transform((val) => val.toUpperCase()),
});

export type UserInputForms = z.infer<typeof userInputSchema>;
