import { z } from "zod";
import { t } from "@/i18n";

export const createTeamInputSchema = z.object({
  name: z.string().min(3, {
    message: t("validation.teamNameMin"),
  }),
  sport: z.string().optional(),
});
export type createTeamInputForms = z.infer<typeof createTeamInputSchema>;
