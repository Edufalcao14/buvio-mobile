import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { en } from "./en";
import { fr } from "./fr";

export type AppLocale = "en" | "fr";

const SUPPORTED: AppLocale[] = ["en", "fr"];

/**
 * English is the default; French follows the device only when the device
 * asks for it. Anything else falls back to English key by key.
 */
export const detectLocale = (): AppLocale => {
  const code = getLocales()[0]?.languageCode?.toLowerCase();
  return code && (SUPPORTED as string[]).includes(code)
    ? (code as AppLocale)
    : "en";
};

export const i18n = new I18n({ en, fr });
i18n.defaultLocale = "en";
i18n.enableFallback = true;
i18n.locale = detectLocale();

/** The current locale, for the pieces that format outside i18n-js (dates). */
export const currentLocale = (): AppLocale =>
  (SUPPORTED as string[]).includes(i18n.locale)
    ? (i18n.locale as AppLocale)
    : "en";

/**
 * `t("vote.live.title")` — the only way copy reaches the screen. Options are
 * i18n-js interpolations: `t("team.code.copied", { code })`.
 */
export const t = (scope: string, options?: Record<string, unknown>): string =>
  i18n.t(scope, options);

export default i18n;
