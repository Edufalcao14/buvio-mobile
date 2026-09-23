import { z } from "zod";
import { t } from "@/i18n";

// 12 characters to match the backend, which is the authority: a shorter
// password passes here and is then rejected by createUser as VALIDATION_FAILED
// on the password field.
const passwordSchema = z
  .string()
  .min(12, { message: t("validation.passwordMin12") })
  .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/, {
    message: t("validation.passwordComplexity"),
  });

export const userInputSchema = z
  .object({
    displayName: z.string().min(3, {
      message: t("validation.fullNameMin"),
    }),
    // Optional: a player left without a surname is known by the first word of
    // their display name. 40 characters is the backend's own ceiling.
    nickname: z
      .string()
      .max(40, {
        message: t("validation.nicknameMax"),
      })
      .optional(),
    email: z.string().email({ message: t("validation.emailInvalid") }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("validation.passwordsMismatch"),
    path: ["confirmPassword"],
  });
export type UserInputForms = z.infer<typeof userInputSchema>;
