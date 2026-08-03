import { z } from "zod";

export const userInputSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse e-mail valide" }),
    password: z
    .string()
    .min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
});
export type UserInputForms = z.infer<typeof userInputSchema>;
