import { z } from "zod";
import { MatchType } from "@/graphql/generated/hooks";

export const matchSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Le nom du match doit contenir au moins 3 caractères" })
    .max(50, { message: "Le nom du match ne peut pas dépasser 50 caractères" }),

  type: z.enum([MatchType.Amical, MatchType.Tournoi, MatchType.Championnat], {
    errorMap: () => ({
      message: "Veuillez sélectionner un type de match valide",
    }),
  }),

  date: z
    .date()
    .refine((date) => date !== null && date !== undefined, {
      message: "Veuillez sélectionner une date pour le match",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "Veuillez sélectionner une date à partir d'aujourd'hui",
      }
    ),
});

export type MatchFormValues = z.infer<typeof matchSchema>;
