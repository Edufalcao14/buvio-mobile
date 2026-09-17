import { ErrorCode } from "./errorCodes";

export type Locale = "fr" | "en";

/**
 * The user-facing wording for each backend error code, per language.
 *
 * Every code must have an entry in every locale: the type makes a missing one a
 * compile error rather than an empty string at runtime.
 */
type Messages = Record<ErrorCode, string>;

const fr: Messages = {
  AUTH_REQUIRED: "Vous devez être connecté pour effectuer cette action.",
  AUTH_ACCOUNT_DISABLED: "Ce compte a été désactivé.",
  AUTH_INVALID_CREDENTIALS:
    "Email ou mot de passe incorrect. Veuillez réessayer.",
  AUTH_EMAIL_NOT_VERIFIED: "Veuillez d'abord vérifier votre adresse e-mail.",
  AUTH_TOKEN_INVALID: "Votre session n'est plus valide. Reconnectez-vous.",
  AUTH_TOKEN_EXPIRED: "Votre session a expiré. Reconnectez-vous.",
  AUTH_TOKEN_REVOKED: "Votre session a été révoquée. Reconnectez-vous.",
  AUTH_REFRESH_TOKEN_INVALID:
    "Votre session a expiré. Veuillez vous reconnecter.",
  AUTH_REFRESH_TOKEN_MISSING:
    "Votre session a expiré. Veuillez vous reconnecter.",
  AUTH_ADMIN_REQUIRED: "Cette action est réservée aux administrateurs.",
  AUTH_ALREADY_IMPERSONATING:
    "Une session d'emprunt d'identité est déjà active.",
  AUTH_NOT_IMPERSONATING: "Aucune session d'emprunt d'identité en cours.",
  AUTH_RATE_LIMITED:
    "Trop de tentatives. Veuillez patienter un instant avant de réessayer.",

  USER_NOT_FOUND: "Utilisateur introuvable.",
  USER_EMAIL_ALREADY_EXISTS: "Un compte existe déjà avec cette adresse e-mail.",
  USER_ALREADY_IN_TEAM: "Vous faites déjà partie d'une équipe.",
  USER_NOT_IN_TEAM:
    "Vous devez d'abord créer ou rejoindre une équipe pour continuer.",

  TEAM_NOT_FOUND: "Équipe introuvable.",
  TEAM_ACCESS_DENIED: "Vous n'avez pas accès à cette équipe.",
  TEAM_CODE_NOT_FOUND:
    "Aucune équipe ne correspond à ce code. Vérifiez le code et réessayez.",
  TEAM_CODE_TAKEN: "Ce code d'équipe est déjà utilisé.",
  TEAM_CODE_GENERATION_FAILED:
    "Impossible de générer un code d'équipe. Veuillez réessayer.",

  MATCH_NOT_FOUND: "Match introuvable.",

  VOTING_SESSION_NOT_FOUND: "Session de vote introuvable.",
  VOTING_SESSION_ALREADY_EXISTS:
    "Une session de vote existe déjà pour ce match.",
  VOTING_SESSION_CLOSED: "La session de vote est terminée.",

  VOTE_NOT_FOUND: "Vote introuvable.",
  VOTE_ALREADY_CAST_FOR_TYPE:
    "Vous avez déjà voté dans cette catégorie pour cette session.",
  VOTE_SAME_PLAYER_TOP_AND_FLOP:
    "Vous ne pouvez pas choisir la même personne en Top et en Flop.",
  VOTE_SELF_NOT_ALLOWED: "Vous ne pouvez pas voter pour vous-même.",
  VOTE_PLAYER_NOT_IN_MATCH: "Ce joueur ne participe pas à ce match.",

  VALIDATION_FAILED: "Certaines informations saisies sont invalides.",
  REQUEST_INVALID: "La requête est invalide.",
  QUERY_TOO_COMPLEX: "La requête est trop volumineuse.",
  INTERNAL_ERROR: "Une erreur est survenue. Veuillez réessayer.",
};

const en: Messages = {
  AUTH_REQUIRED: "You need to be signed in to do this.",
  AUTH_ACCOUNT_DISABLED: "This account has been disabled.",
  AUTH_INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
  AUTH_EMAIL_NOT_VERIFIED: "Please verify your email address first.",
  AUTH_TOKEN_INVALID: "Your session is no longer valid. Please sign in again.",
  AUTH_TOKEN_EXPIRED: "Your session has expired. Please sign in again.",
  AUTH_TOKEN_REVOKED: "Your session was revoked. Please sign in again.",
  AUTH_REFRESH_TOKEN_INVALID: "Your session has expired. Please sign in again.",
  AUTH_REFRESH_TOKEN_MISSING: "Your session has expired. Please sign in again.",
  AUTH_ADMIN_REQUIRED: "Only an administrator can do this.",
  AUTH_ALREADY_IMPERSONATING: "An impersonation session is already active.",
  AUTH_NOT_IMPERSONATING: "No impersonation session is active.",
  AUTH_RATE_LIMITED: "Too many attempts. Please wait a moment and try again.",

  USER_NOT_FOUND: "User not found.",
  USER_EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  USER_ALREADY_IN_TEAM: "You are already part of a team.",
  USER_NOT_IN_TEAM: "Create or join a team first to continue.",

  TEAM_NOT_FOUND: "Team not found.",
  TEAM_ACCESS_DENIED: "You do not have access to this team.",
  TEAM_CODE_NOT_FOUND:
    "No team matches this code. Check the code and try again.",
  TEAM_CODE_TAKEN: "This team code is already taken.",
  TEAM_CODE_GENERATION_FAILED:
    "Could not generate a team code. Please try again.",

  MATCH_NOT_FOUND: "Match not found.",

  VOTING_SESSION_NOT_FOUND: "Voting session not found.",
  VOTING_SESSION_ALREADY_EXISTS:
    "A voting session already exists for this match.",
  VOTING_SESSION_CLOSED: "The voting session has closed.",

  VOTE_NOT_FOUND: "Vote not found.",
  VOTE_ALREADY_CAST_FOR_TYPE:
    "You have already voted in this category for this session.",
  VOTE_SAME_PLAYER_TOP_AND_FLOP:
    "You cannot pick the same person as both Top and Flop.",
  VOTE_SELF_NOT_ALLOWED: "You cannot vote for yourself.",
  VOTE_PLAYER_NOT_IN_MATCH: "This player is not part of this match.",

  VALIDATION_FAILED: "Some of the information you entered is invalid.",
  REQUEST_INVALID: "The request is invalid.",
  QUERY_TOO_COMPLEX: "The request is too large.",
  INTERNAL_ERROR: "Something went wrong. Please try again.",
};

export const MESSAGES: Record<Locale, Messages> = { fr, en };

export const DEFAULT_LOCALE: Locale = "fr";

/**
 * Per-field wording for VALIDATION_FAILED, which carries `details.field` and
 * `details.rule` instead of a code per field.
 */
const validationFieldLabels: Record<Locale, Record<string, string>> = {
  fr: {
    email: "l'adresse e-mail",
    password: "le mot de passe",
    displayName: "le nom complet",
    code: "le code d'équipe",
    name: "le nom",
    date: "la date",
    type: "le type",
    matchId: "le match",
    votingSessionId: "la session de vote",
    votedForUserId: "le joueur sélectionné",
  },
  en: {
    email: "the email address",
    password: "the password",
    displayName: "the full name",
    code: "the team code",
    name: "the name",
    date: "the date",
    type: "the type",
    matchId: "the match",
    votingSessionId: "the voting session",
    votedForUserId: "the selected player",
  },
};

export const validationMessage = (
  locale: Locale,
  field?: string
): string | null => {
  if (!field) {
    return null;
  }

  const label = validationFieldLabels[locale][field];

  if (!label) {
    return null;
  }

  return locale === "fr"
    ? `Veuillez vérifier ${label}.`
    : `Please check ${label}.`;
};
