/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A DateTime scalar type that handles values as ISO 8601 date strings */
  DateTime: { input: any; output: any; }
  /** Email custom scalar type */
  Email: { input: any; output: any; }
};

/** Complete authentication response containing tokens and user data */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** JWT token for authorizing API requests */
  accessToken: Scalars['String']['output'];
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars['String']['output'];
  /** Complete user profile information for the authenticated user */
  user: User;
};

/** Authentication token set with expiration information */
export type AuthTokens = {
  __typename?: 'AuthTokens';
  /** JWT token for authorizing API requests */
  accessToken: Scalars['String']['output'];
  /** Precise date and time when the tokens will expire */
  expiredAt: Scalars['DateTime']['output'];
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars['String']['output'];
};

/** How far one player has got with their ballot in an open session */
export type BallotProgress = {
  __typename?: 'BallotProgress';
  hasFlop: Scalars['Boolean']['output'];
  hasTop: Scalars['Boolean']['output'];
  isComplete: Scalars['Boolean']['output'];
  player: User;
};

/** Match */
export type Match = {
  __typename?: 'Match';
  /** Timestamp when the match was first created */
  createdAt: Scalars['DateTime']['output'];
  /** User who created the match */
  creator: User;
  /** The team's code that enables users to join the team */
  date: Scalars['DateTime']['output'];
  /** Timestamp when the match was soft-deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique internal identifier for the match */
  id: Scalars['ID']['output'];
  /** Match's display name shown across the application */
  name: Scalars['String']['output'];
  /** List of players participating in the match */
  players: Array<User>;
  /** Team participating in the match */
  team: Team;
  /** Type of the match */
  type: MatchType;
  /** Timestamp when the match was last modified */
  updatedAt: Scalars['DateTime']['output'];
  /** Current voting session of the match session or null if not started yet */
  votingSession?: Maybe<VotingSession>;
};

export enum MatchType {
  Amical = 'AMICAL',
  Championnat = 'CHAMPIONNAT',
  Tournoi = 'TOURNOI'
}

/** Current authenticated user's essential profile data */
export type Me = {
  __typename?: 'Me';
  /** Where to read this player's avatar. Null until they have uploaded one */
  avatarUrl?: Maybe<Scalars['String']['output']>;
  /** User's name displayed throughout the interface */
  displayName: Scalars['String']['output'];
  /** Primary email address of the authenticated user */
  email: Scalars['String']['output'];
  /** Unique identifier of the authenticated user */
  id: Scalars['ID']['output'];
  /** The name the squad knows this player by. Null when unset */
  nickname?: Maybe<Scalars['String']['output']>;
  /** Organization team identifier the user belongs to */
  team?: Maybe<Team>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Closes a voting session early. Only the player who started it may do this */
  closeVotingSession: VotingSession;
  /** Attaches an uploaded object to the caller as their avatar */
  confirmAvatarUpload: Me;
  /** Attaches an uploaded object to the caller's team as its crest */
  confirmTeamCrestUpload: Team;
  /**
   * Requests permission to upload a new avatar for the caller. Accepts
   * image/jpeg, image/png and image/webp
   */
  createAvatarUploadUrl: UploadTicket;
  /** Creates a new Match with a specified name and date */
  createMatch: Match;
  /** Creates a new team with a specified name and optional sport */
  createTeam: Team;
  /**
   * Requests permission to upload a new crest for the caller's team. Only the
   * player who created the team may do this
   */
  createTeamCrestUploadUrl: UploadTicket;
  /** Registers a new user account with required credentials and profile information */
  createUser: AuthPayload;
  /** Creates a new vote session for a specified match (optionnal) */
  createVotingSession: VotingSession;
  /** Join a new team with a specified name and optional sport */
  joinTeam: Team;
  /** Refreshes the token of an existing user and returns new tokens */
  refreshToken: AuthTokens;
  /** Authenticates an existing user with credentials and returns tokens */
  signIn: AuthPayload;
  /** Creates a new vote  for a specified vote Session */
  submitVote: Vote;
  /**
   * Updates the caller's own profile. An omitted field is left untouched; an
   * empty nickname clears it and puts the player back on the display-name
   * fallback
   */
  updateProfile: Me;
};


export type MutationCloseVotingSessionArgs = {
  votingSessionId: Scalars['ID']['input'];
};


export type MutationConfirmAvatarUploadArgs = {
  key: Scalars['String']['input'];
};


export type MutationConfirmTeamCrestUploadArgs = {
  key: Scalars['String']['input'];
};


export type MutationCreateAvatarUploadUrlArgs = {
  contentType: Scalars['String']['input'];
};


export type MutationCreateMatchArgs = {
  date: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  type: MatchType;
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']['input'];
  sport?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTeamCrestUploadUrlArgs = {
  contentType: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};


export type MutationCreateVotingSessionArgs = {
  closingAt?: InputMaybe<Scalars['DateTime']['input']>;
  matchId: Scalars['ID']['input'];
};


export type MutationJoinTeamArgs = {
  code: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSubmitVoteArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  type: VoteType;
  votedUserId: Scalars['ID']['input'];
  votingSession: Scalars['ID']['input'];
};


export type MutationUpdateProfileArgs = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
};

/**
 * One player's place in their team's standings, counted over closed voting
 * sessions only
 */
export type PlayerStanding = {
  __typename?: 'PlayerStanding';
  /** How many times the squad voted this player flop */
  flopCount: Scalars['Int']['output'];
  /** The player this row is about */
  player: User;
  /** How many times the squad voted this player top */
  topCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves a Match by its ID */
  getMatchById: Match;
  /** Retrieves a list of all players associated with the specified team */
  getTeamMembers: Array<User>;
  /** Validates if an email address is already registered in the system */
  isEmailTaken: Scalars['Boolean']['output'];
  /** Retrieves the current authenticated user's profile information */
  me: Me;
  /** Retrieves the team associated with the specified code */
  teamByCode: Team;
  /**
   * Standings of the caller's team, best first. Every member is listed, even
   * those nobody has voted for yet
   */
  teamRanking: Array<PlayerStanding>;
  /** Checks if the current authenticated user has already voted in the specified voting session */
  userHasVoted?: Maybe<Scalars['Boolean']['output']>;
  /** Validates if a team's code exists */
  validateTeamCode: Scalars['Boolean']['output'];
};


export type QueryGetMatchByIdArgs = {
  matchId: Scalars['ID']['input'];
};


export type QueryIsEmailTakenArgs = {
  email: Scalars['String']['input'];
};


export type QueryTeamByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryUserHasVotedArgs = {
  playerId: Scalars['ID']['input'];
  votingSessionId: Scalars['ID']['input'];
};


export type QueryValidateTeamCodeArgs = {
  code: Scalars['String']['input'];
};

/** Input used to obtain access tokens without re-authentication */
export type RefreshTokenInput = {
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Pushes the voting session every time it changes: a ballot cast, or the
   * session closing
   */
  votingSessionUpdated: VotingSession;
};


export type SubscriptionVotingSessionUpdatedArgs = {
  votingSessionId: Scalars['ID']['input'];
};

/**
 * How many Top and Flop votes one player has collected so far in this session.
 * Public while the session is open — watching the count move is the ritual
 */
export type TallyEntry = {
  __typename?: 'TallyEntry';
  flopCount: Scalars['Int']['output'];
  player: User;
  topCount: Scalars['Int']['output'];
};

/** Team */
export type Team = {
  __typename?: 'Team';
  /** The team's code that enables users to join the team */
  code: Scalars['String']['output'];
  /** Timestamp when the team was first created */
  createdAt: Scalars['DateTime']['output'];
  /** User who created the team */
  creator: User;
  /**
   * Where to read the team's crest. Null while the team still shows a monogram
   * of its initials
   */
  crestUrl?: Maybe<Scalars['String']['output']>;
  /** Unique internal identifier for the team */
  id: Scalars['ID']['output'];
  /** Returns a list of all matches in the system */
  matches: Array<Maybe<Match>>;
  /** Team's display name shown across the application */
  name: Scalars['String']['output'];
  /** The sport that the team specializes in */
  sport?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the team was last modified */
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * Permission to upload one image straight to the bucket. The client PUTs the
 * bytes to uploadUrl, then hands key back to the matching confirm mutation —
 * which is what actually attaches the image
 */
export type UploadTicket = {
  __typename?: 'UploadTicket';
  /** The object key to send back once the upload succeeded */
  key: Scalars['String']['output'];
  /**
   * Short-lived signed URL to PUT the image bytes to. It pins the content type
   * the ticket was issued for
   */
  uploadUrl: Scalars['String']['output'];
};

/** System user account with core identity information */
export type User = {
  __typename?: 'User';
  /** Where to read this player's avatar. Null until they have uploaded one */
  avatarUrl?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the user account was first created */
  createdAt: Scalars['DateTime']['output'];
  /** Timestamp when the user account was soft-deleted, if applicable */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User's display name shown across the application */
  displayName: Scalars['String']['output'];
  /** User's verified email address for communications */
  email: Scalars['String']['output'];
  /** Reference ID linked to external systems or services */
  externalId: Scalars['ID']['output'];
  /** Unique internal identifier for the user */
  id: Scalars['ID']['output'];
  /**
   * The name the squad knows this player by. Null when unset, in which case
   * clients fall back to the first word of the display name
   */
  nickname?: Maybe<Scalars['String']['output']>;
  /** Reference to team membership for organizational structure */
  team?: Maybe<Team>;
  /** Timestamp when the user account was last modified */
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents a single vote cast by a user in a voting session, indicating their top and flop choices */
export type Vote = {
  __typename?: 'Vote';
  /** Timestamp when the vote was first created */
  createdAt: Scalars['DateTime']['output'];
  /** Timestamp when the vote was soft deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Optional description or comment for the vote */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique internal identifier for the vote */
  id: Scalars['ID']['output'];
  /** The type of vote (top or flop) */
  type: VoteType;
  /** Timestamp when the vote was last modified */
  updatedAt: Scalars['DateTime']['output'];
  /** The user voted */
  voted: User;
  /** The user who cast this vote */
  voter: User;
  /** The voting session this vote belongs to */
  votingSession: VotingSession;
};

export enum VoteClosureReason {
  Admin = 'ADMIN',
  Deadline = 'DEADLINE',
  Unanimous = 'UNANIMOUS'
}

export type VoteResult = {
  __typename?: 'VoteResult';
  flop: User;
  top: User;
};

export enum VoteSessionStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export enum VoteType {
  Flop = 'FLOP',
  Top = 'TOP'
}

export type VotingSession = {
  __typename?: 'VotingSession';
  /** Ballot progress of every player on the match roster */
  ballots: Array<BallotProgress>;
  /** When the session actually closed. Null while it is open */
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Why the session closed. Null while it is open */
  closedReason?: Maybe<VoteClosureReason>;
  /** Optional date and time when the voting session will close */
  closingAt?: Maybe<Scalars['DateTime']['output']>;
  /** Timestamp when the vote session was first created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique internal identifier for the voting session */
  id: Scalars['ID']['output'];
  /** The match associated with this voting session */
  match: Match;
  /** User who initiated the voting session */
  startedBy: User;
  /** Current voting status of the session */
  status: VoteSessionStatus;
  /** The live count, one entry per player who has received at least one vote */
  tally: Array<TallyEntry>;
  /** The remaining time for an open voting session in seconds */
  timeRemaining: Scalars['Int']['output'];
  /** Timestamp when the vote session was last modified */
  updatedAt: Scalars['DateTime']['output'];
  /**
   * Results of the voting session, including the top and flop users. Null until
   * the session closes
   */
  voteResult?: Maybe<VoteResult>;
  /** Every vote cast so far, with its comment */
  votes: Array<Vote>;
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, crestUrl?: string | null, creator: { __typename?: 'User', id: string, displayName: string, email: string, externalId: string } } | null } } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthPayload', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, email: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, crestUrl?: string | null, creator: { __typename?: 'User', id: string, displayName: string, externalId: string, email: string } } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthTokens', accessToken: string, refreshToken: string, expiredAt: any } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  sport?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, code: string, crestUrl?: string | null, createdAt: any, updatedAt: any, sport?: string | null, creator: { __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string } } };

export type JoinTeamMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type JoinTeamMutation = { __typename?: 'Mutation', joinTeam: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, crestUrl?: string | null, createdAt: any, updatedAt: any, creator: { __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string } } };

export type CreateMatchMutationVariables = Exact<{
  name: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  type: MatchType;
}>;


export type CreateMatchMutation = { __typename?: 'Mutation', createMatch: { __typename?: 'Match', id: string, name: string, date: any, type: MatchType, createdAt: any, updatedAt: any, deletedAt?: any | null, creator: { __typename?: 'User', displayName: string, email: string }, team: { __typename?: 'Team', name: string, code: string }, players: Array<{ __typename?: 'User', displayName: string, email: string }>, votingSession?: { __typename?: 'VotingSession', status: VoteSessionStatus, timeRemaining: number, voteResult?: { __typename?: 'VoteResult', flop: { __typename?: 'User', id: string, displayName: string }, top: { __typename?: 'User', id: string, displayName: string } } | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, email: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, crestUrl?: string | null, creator: { __typename?: 'User', id: string, displayName: string, externalId: string, email: string } } | null } };

export type ValidateTeamCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ValidateTeamCodeQuery = { __typename?: 'Query', validateTeamCode: boolean };

export type GetTeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeamMembers: Array<{ __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, team?: { __typename?: 'Team', name: string, code: string, sport?: string | null, crestUrl?: string | null, createdAt: any, updatedAt: any, creator: { __typename?: 'User', displayName: string, email: string } } | null }> };

export type TeamHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamHistoryQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, matches: Array<{ __typename?: 'Match', id: string, name: string, date: any, type: MatchType, players: Array<{ __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null }>, votingSession?: { __typename?: 'VotingSession', id: string, status: VoteSessionStatus, timeRemaining: number, voteResult?: { __typename?: 'VoteResult', top: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null }, flop: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null } } | null } | null } | null> } | null } };

export type TeamVoteStateQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamVoteStateQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, team?: { __typename?: 'Team', id: string, matches: Array<{ __typename?: 'Match', id: string, name: string, date: any, votingSession?: { __typename?: 'VotingSession', id: string, status: VoteSessionStatus, timeRemaining: number, ballots: Array<{ __typename?: 'BallotProgress', isComplete: boolean, player: { __typename?: 'User', id: string } }> } | null } | null> } | null } };

export type UpdateProfileMutationVariables = Exact<{
  nickname?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Me', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, email: string } };

export type CreateAvatarUploadUrlMutationVariables = Exact<{
  contentType: Scalars['String']['input'];
}>;


export type CreateAvatarUploadUrlMutation = { __typename?: 'Mutation', createAvatarUploadUrl: { __typename?: 'UploadTicket', uploadUrl: string, key: string } };

export type ConfirmAvatarUploadMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmAvatarUploadMutation = { __typename?: 'Mutation', confirmAvatarUpload: { __typename?: 'Me', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null, email: string } };

export type CreateTeamCrestUploadUrlMutationVariables = Exact<{
  contentType: Scalars['String']['input'];
}>;


export type CreateTeamCrestUploadUrlMutation = { __typename?: 'Mutation', createTeamCrestUploadUrl: { __typename?: 'UploadTicket', uploadUrl: string, key: string } };

export type ConfirmTeamCrestUploadMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmTeamCrestUploadMutation = { __typename?: 'Mutation', confirmTeamCrestUpload: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, crestUrl?: string | null } };

export type TeamRankingQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamRankingQuery = { __typename?: 'Query', teamRanking: Array<{ __typename?: 'PlayerStanding', topCount: number, flopCount: number, player: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null } }> };

export type VotingSessionStateFragment = { __typename?: 'VotingSession', id: string, status: VoteSessionStatus, timeRemaining: number, closingAt?: any | null, closedAt?: any | null, closedReason?: VoteClosureReason | null, startedBy: { __typename?: 'User', id: string, displayName: string, nickname?: string | null }, match: { __typename?: 'Match', id: string, name: string, date: any }, ballots: Array<{ __typename?: 'BallotProgress', hasTop: boolean, hasFlop: boolean, isComplete: boolean, player: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null } }>, tally: Array<{ __typename?: 'TallyEntry', topCount: number, flopCount: number, player: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null } }>, voteResult?: { __typename?: 'VoteResult', top: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null }, flop: { __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null } } | null } & { ' $fragmentName'?: 'VotingSessionStateFragment' };

export type SubmitVoteMutationVariables = Exact<{
  votingSession: Scalars['ID']['input'];
  votedUserId: Scalars['ID']['input'];
  type: VoteType;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubmitVoteMutation = { __typename?: 'Mutation', submitVote: { __typename?: 'Vote', id: string, type: VoteType, description?: string | null, voted: { __typename?: 'User', id: string, displayName: string, nickname?: string | null } } };

export type CreateVotingSessionMutationVariables = Exact<{
  matchId: Scalars['ID']['input'];
  closingAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type CreateVotingSessionMutation = { __typename?: 'Mutation', createVotingSession: (
    { __typename?: 'VotingSession' }
    & { ' $fragmentRefs'?: { 'VotingSessionStateFragment': VotingSessionStateFragment } }
  ) };

export type CloseVotingSessionMutationVariables = Exact<{
  votingSessionId: Scalars['ID']['input'];
}>;


export type CloseVotingSessionMutation = { __typename?: 'Mutation', closeVotingSession: (
    { __typename?: 'VotingSession' }
    & { ' $fragmentRefs'?: { 'VotingSessionStateFragment': VotingSessionStateFragment } }
  ) };

export type VoteMatchQueryVariables = Exact<{
  matchId: Scalars['ID']['input'];
}>;


export type VoteMatchQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null }, getMatchById: { __typename?: 'Match', id: string, name: string, date: any, type: MatchType, players: Array<{ __typename?: 'User', id: string, displayName: string, nickname?: string | null, avatarUrl?: string | null }>, votingSession?: (
      { __typename?: 'VotingSession' }
      & { ' $fragmentRefs'?: { 'VotingSessionStateFragment': VotingSessionStateFragment } }
    ) | null } };

export type VotingSessionUpdatedSubscriptionVariables = Exact<{
  votingSessionId: Scalars['ID']['input'];
}>;


export type VotingSessionUpdatedSubscription = { __typename?: 'Subscription', votingSessionUpdated: (
    { __typename?: 'VotingSession' }
    & { ' $fragmentRefs'?: { 'VotingSessionStateFragment': VotingSessionStateFragment } }
  ) };

export const VotingSessionStateFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VotingSessionState"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VotingSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"closingAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedReason"}},{"kind":"Field","name":{"kind":"Name","value":"startedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTop"}},{"kind":"Field","name":{"kind":"Name","value":"hasFlop"}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tally"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<VotingSessionStateFragment, unknown>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const JoinTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const CreateMatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votingSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMatchMutation, CreateMatchMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ValidateTeamCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"validateTeamCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateTeamCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>;
export const GetTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const TeamHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votingSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamHistoryQuery, TeamHistoryQueryVariables>;
export const TeamVoteStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamVoteState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"matches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"votingSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeamVoteStateQuery, TeamVoteStateQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreateAvatarUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAvatarUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAvatarUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<CreateAvatarUploadUrlMutation, CreateAvatarUploadUrlMutationVariables>;
export const ConfirmAvatarUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmAvatarUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmAvatarUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ConfirmAvatarUploadMutation, ConfirmAvatarUploadMutationVariables>;
export const CreateTeamCrestUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeamCrestUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeamCrestUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<CreateTeamCrestUploadUrlMutation, CreateTeamCrestUploadUrlMutationVariables>;
export const ConfirmTeamCrestUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmTeamCrestUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmTeamCrestUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"crestUrl"}}]}}]}}]} as unknown as DocumentNode<ConfirmTeamCrestUploadMutation, ConfirmTeamCrestUploadMutationVariables>;
export const TeamRankingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamRanking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamRanking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}},{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<TeamRankingQuery, TeamRankingQueryVariables>;
export const SubmitVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"votingSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"votedUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VoteType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"votingSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"votingSession"}}},{"kind":"Argument","name":{"kind":"Name","value":"votedUserId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"votedUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"voted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitVoteMutation, SubmitVoteMutationVariables>;
export const CreateVotingSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVotingSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"matchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"closingAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVotingSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"matchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"matchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"closingAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"closingAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VotingSessionState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VotingSessionState"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VotingSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"closingAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedReason"}},{"kind":"Field","name":{"kind":"Name","value":"startedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTop"}},{"kind":"Field","name":{"kind":"Name","value":"hasFlop"}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tally"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CreateVotingSessionMutation, CreateVotingSessionMutationVariables>;
export const CloseVotingSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CloseVotingSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"votingSessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeVotingSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"votingSessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"votingSessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VotingSessionState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VotingSessionState"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VotingSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"closingAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedReason"}},{"kind":"Field","name":{"kind":"Name","value":"startedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTop"}},{"kind":"Field","name":{"kind":"Name","value":"hasFlop"}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tally"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CloseVotingSessionMutation, CloseVotingSessionMutationVariables>;
export const VoteMatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VoteMatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"matchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getMatchById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"matchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"matchId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votingSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VotingSessionState"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VotingSessionState"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VotingSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"closingAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedReason"}},{"kind":"Field","name":{"kind":"Name","value":"startedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTop"}},{"kind":"Field","name":{"kind":"Name","value":"hasFlop"}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tally"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<VoteMatchQuery, VoteMatchQueryVariables>;
export const VotingSessionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"VotingSessionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"votingSessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votingSessionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"votingSessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"votingSessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VotingSessionState"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VotingSessionState"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VotingSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"closingAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"closedReason"}},{"kind":"Field","name":{"kind":"Name","value":"startedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"match"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ballots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTop"}},{"kind":"Field","name":{"kind":"Name","value":"hasFlop"}},{"kind":"Field","name":{"kind":"Name","value":"isComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tally"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCount"}},{"kind":"Field","name":{"kind":"Name","value":"flopCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]}}]} as unknown as DocumentNode<VotingSessionUpdatedSubscription, VotingSessionUpdatedSubscriptionVariables>;