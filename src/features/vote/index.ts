/**
 * Public API of the vote feature.
 *
 * Other features import from here and from nowhere else inside `vote/` (see
 * docs/ARCHITECTURE.md — "an explicit public API via an index.ts barrel").
 * Today the Matchs screen needs one thing only: does this player still owe a
 * vote, and for which match.
 */
export { usePendingVoteViewModel } from "./hooks/usePendingVoteViewModel";
export type { PendingVote } from "./hooks/usePendingVoteViewModel";

export { default as VoteScreen } from "./screens/VoteScreen";
