import { z } from "zod";

export const userInputSchema = z.object({
  code: z
    .string()
    .length(5, {
      message:
        "Veuillez entrer un code de 5 caractères qui contient uniquement des lettres et des chiffres.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "Veuillez vous assurer que le code contient seulement des lettres et des chiffres.",
    })
    .transform((val) => val.toUpperCase()),
});

export type UserInputForms = z.infer<typeof userInputSchema>;
