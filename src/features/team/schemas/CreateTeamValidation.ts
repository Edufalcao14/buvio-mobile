import { z } from "zod";

export const createTeamInputSchema = z
  .object({
    name: z.string().min(3, {
      message: "Le champs Nom de l'équipe doit comporter au moins 3 caractères",
    }),
    sport: z.string().optional(),
  });
export type createTeamInputForms = z.infer<typeof createTeamInputSchema>;
