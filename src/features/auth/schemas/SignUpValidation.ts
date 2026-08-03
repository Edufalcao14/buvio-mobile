import { z } from "zod";

// 12 characters to match the backend, which is the authority: a shorter
// password passes here and is then rejected by createUser as VALIDATION_FAILED
// on the password field.
const passwordSchema = z
  .string()
  .min(12, { message: "Le mot de passe doit comporter au moins 12 caractères" })
  .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/, {
    message:
      "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial",
  });

export const userInputSchema = z
  .object({
    displayName: z.string().min(3, {
      message: "Le champs Nom Complet doit comporter au moins 3 caractères",
    }),
    // Optional: a player left without a surname is known by the first word of
    // their display name. 40 characters is the backend's own ceiling.
    nickname: z
      .string()
      .max(40, {
        message: "Le surnom ne peut pas dépasser 40 caractères",
      })
      .optional(),
    email: z
      .string()
      .email({ message: "Veuillez entrer une adresse e-mail valide" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
export type UserInputForms = z.infer<typeof userInputSchema>;
