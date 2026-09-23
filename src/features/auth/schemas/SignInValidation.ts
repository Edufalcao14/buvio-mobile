import { z } from "zod";
import { t } from "@/i18n";

export const userInputSchema = z.object({
  email: z.string().email({ message: t("validation.emailInvalid") }),
  password: z.string().min(6, {
    message: t("validation.passwordMin6"),
  }),
});
export type UserInputForms = z.infer<typeof userInputSchema>;
