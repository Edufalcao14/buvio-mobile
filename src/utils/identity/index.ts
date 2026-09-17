/**
 * The name the squad reads.
 *
 * A player has two names: the Display Name — their real one, used where
 * identity matters (profile, settings) — and the Nickname, the name the squad
 * knows them by, which rules every social surface: voting, standings,
 * history. When no nickname is set, the first word of the display name stands
 * in, so a locker-room screen never reads like an administrative form.
 *
 * The rule lives here rather than in each ViewModel because every feature
 * shows players and all of them must fall back identically.
 */
export type PlayerIdentity = {
  displayName?: string | null;
  nickname?: string | null;
};

/**
 * Both names are treated as possibly absent: a player rendered from a partial
 * cache entry must still get a name to show, never a crash.
 */
export const nicknameOf = ({
  displayName,
  nickname,
}: PlayerIdentity): string => {
  const chosen = nickname?.trim();

  if (chosen) {
    return chosen;
  }

  const full = displayName?.trim() ?? "";

  return full.split(/\s+/)[0] || full;
};
