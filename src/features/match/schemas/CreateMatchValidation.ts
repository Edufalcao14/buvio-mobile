import { z } from "zod";
import { MatchType } from "@/graphql/generated/hooks";
import { t } from "@/i18n";

export const matchSchema = z.object({
  name: z
    .string()
    .min(3, { message: t("validation.matchNameMin") })
    .max(50, { message: t("validation.matchNameMax") }),

  type: z.enum([MatchType.Amical, MatchType.Tournoi, MatchType.Championnat], {
    errorMap: () => ({
      message: t("validation.matchType"),
    }),
  }),

  date: z
    .date()
    .refine((date) => date !== null && date !== undefined, {
      message: t("validation.matchDateRequired"),
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: t("validation.matchDateFuture"),
      }
    ),
});

export type MatchFormValues = z.infer<typeof matchSchema>;
