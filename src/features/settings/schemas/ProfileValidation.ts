import { z } from "zod";
import { t } from "@/i18n";

/**
 * The two names a player carries. The display name is the real one and is
 * required; the nickname is what the squad calls them and may be cleared — an
 * empty field puts them back on the first word of the display name.
 */
export const profileSchema = z.object({
  displayName: z.string().min(3, {
    message: t("validation.fullNameMin"),
  }),
  nickname: z.string().max(40, {
    message: t("validation.nicknameMax"),
  }),
});

export type ProfileForms = z.infer<typeof profileSchema>;
