import { z } from "zod";

/**
 * The two names a player carries. The display name is the real one and is
 * required; the nickname is what the squad calls them and may be cleared — an
 * empty field puts them back on the first word of the display name.
 */
export const profileSchema = z.object({
  displayName: z.string().min(3, {
    message: "Le champs Nom Complet doit comporter au moins 3 caractères",
  }),
  nickname: z.string().max(40, {
    message: "Le surnom ne peut pas dépasser 40 caractères",
  }),
});

export type ProfileForms = z.infer<typeof profileSchema>;
