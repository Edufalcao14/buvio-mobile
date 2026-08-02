import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" })
  .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
    message:
      "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial",
  });

export const userInputSchema = z
  .object({
    displayName: z.string().min(3, {
      message: "Le champs Nom Complet doit comporter au moins 3 caractères",
    }),
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
