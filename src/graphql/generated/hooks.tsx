import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Email: { input: any; output: any };
};

/** Complete authentication response containing tokens and user data */
export type AuthPayload = {
  __typename?: "AuthPayload";
  /** JWT token for authorizing API requests */
  accessToken: Scalars["String"]["output"];
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars["String"]["output"];
  /** Complete user profile information for the authenticated user */
  user: User;
};

/** Authentication token set with expiration information */
export type AuthTokens = {
  __typename?: "AuthTokens";
  /** JWT token for authorizing API requests */
  accessToken: Scalars["String"]["output"];
  /** Precise date and time when the tokens will expire */
  expiredAt: Scalars["DateTime"]["output"];
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars["String"]["output"];
};

/** How far one player has got with their ballot in an open session */
export type BallotProgress = {
  __typename?: "BallotProgress";
  hasFlop: Scalars["Boolean"]["output"];
  hasTop: Scalars["Boolean"]["output"];
  isComplete: Scalars["Boolean"]["output"];
  player: User;
};

/** Match */
export type Match = {
  __typename?: "Match";
  /** Timestamp when the match was first created */
  createdAt: Scalars["DateTime"]["output"];
  /** User who created the match */
  creator: User;
  /** The team's code that enables users to join the team */
  date: Scalars["DateTime"]["output"];
  /** Timestamp when the match was soft-deleted */
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Unique internal identifier for the match */
  id: Scalars["ID"]["output"];
  /** Match's display name shown across the application */
  name: Scalars["String"]["output"];
  /** List of players participating in the match */
  players: Array<User>;
  /** Team participating in the match */
  team: Team;
  /** Type of the match */
  type: MatchType;
  /** Timestamp when the match was last modified */
  updatedAt: Scalars["DateTime"]["output"];
  /** Current voting session of the match session or null if not started yet */
  votingSession?: Maybe<VotingSession>;
};

export enum MatchType {
  Amical = "AMICAL",
  Championnat = "CHAMPIONNAT",
  Tournoi = "TOURNOI",
}

/** Current authenticated user's essential profile data */
export type Me = {
  __typename?: "Me";
  /** Where to read this player's avatar. Null until they have uploaded one */
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  /** User's name displayed throughout the interface */
  displayName: Scalars["String"]["output"];
  /** Primary email address of the authenticated user */
  email: Scalars["String"]["output"];
  /** Unique identifier of the authenticated user */
  id: Scalars["ID"]["output"];
  /** The name the squad knows this player by. Null when unset */
  nickname?: Maybe<Scalars["String"]["output"]>;
  /** Organization team identifier the user belongs to */
  team?: Maybe<Team>;
};

export type Mutation = {
  __typename?: "Mutation";
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
  votingSessionId: Scalars["ID"]["input"];
};

export type MutationConfirmAvatarUploadArgs = {
  key: Scalars["String"]["input"];
};

export type MutationConfirmTeamCrestUploadArgs = {
  key: Scalars["String"]["input"];
};

export type MutationCreateAvatarUploadUrlArgs = {
  contentType: Scalars["String"]["input"];
};

export type MutationCreateMatchArgs = {
  date: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
  type: MatchType;
};

export type MutationCreateTeamArgs = {
  name: Scalars["String"]["input"];
  sport?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateTeamCrestUploadUrlArgs = {
  contentType: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  displayName: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  nickname?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type MutationCreateVotingSessionArgs = {
  closingAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  matchId: Scalars["ID"]["input"];
};

export type MutationJoinTeamArgs = {
  code: Scalars["String"]["input"];
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationSignInArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSubmitVoteArgs = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  type: VoteType;
  votedUserId: Scalars["ID"]["input"];
  votingSession: Scalars["ID"]["input"];
};

export type MutationUpdateProfileArgs = {
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  nickname?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * One player's place in their team's standings, counted over closed voting
 * sessions only
 */
export type PlayerStanding = {
  __typename?: "PlayerStanding";
  /** How many times the squad voted this player flop */
  flopCount: Scalars["Int"]["output"];
  /** The player this row is about */
  player: User;
  /** How many times the squad voted this player top */
  topCount: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  /** Retrieves a Match by its ID */
  getMatchById: Match;
  /** Retrieves a list of all players associated with the specified team */
  getTeamMembers: Array<User>;
  /** Validates if an email address is already registered in the system */
  isEmailTaken: Scalars["Boolean"]["output"];
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
  userHasVoted?: Maybe<Scalars["Boolean"]["output"]>;
  /** Validates if a team's code exists */
  validateTeamCode: Scalars["Boolean"]["output"];
};

export type QueryGetMatchByIdArgs = {
  matchId: Scalars["ID"]["input"];
};

export type QueryIsEmailTakenArgs = {
  email: Scalars["String"]["input"];
};

export type QueryTeamByCodeArgs = {
  code: Scalars["String"]["input"];
};

export type QueryUserHasVotedArgs = {
  playerId: Scalars["ID"]["input"];
  votingSessionId: Scalars["ID"]["input"];
};

export type QueryValidateTeamCodeArgs = {
  code: Scalars["String"]["input"];
};

/** Input used to obtain access tokens without re-authentication */
export type RefreshTokenInput = {
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  /**
   * Pushes the voting session every time it changes: a ballot cast, or the
   * session closing
   */
  votingSessionUpdated: VotingSession;
};

export type SubscriptionVotingSessionUpdatedArgs = {
  votingSessionId: Scalars["ID"]["input"];
};

/**
 * How many Top and Flop votes one player has collected so far in this session.
 * Public while the session is open — watching the count move is the ritual
 */
export type TallyEntry = {
  __typename?: "TallyEntry";
  flopCount: Scalars["Int"]["output"];
  player: User;
  topCount: Scalars["Int"]["output"];
};

/** Team */
export type Team = {
  __typename?: "Team";
  /** The team's code that enables users to join the team */
  code: Scalars["String"]["output"];
  /** Timestamp when the team was first created */
  createdAt: Scalars["DateTime"]["output"];
  /** User who created the team */
  creator: User;
  /**
   * Where to read the team's crest. Null while the team still shows a monogram
   * of its initials
   */
  crestUrl?: Maybe<Scalars["String"]["output"]>;
  /** Unique internal identifier for the team */
  id: Scalars["ID"]["output"];
  /** Returns a list of all matches in the system */
  matches: Array<Maybe<Match>>;
  /** Team's display name shown across the application */
  name: Scalars["String"]["output"];
  /** The sport that the team specializes in */
  sport?: Maybe<Scalars["String"]["output"]>;
  /** Timestamp when the team was last modified */
  updatedAt: Scalars["DateTime"]["output"];
};

/**
 * Permission to upload one image straight to the bucket. The client PUTs the
 * bytes to uploadUrl, then hands key back to the matching confirm mutation —
 * which is what actually attaches the image
 */
export type UploadTicket = {
  __typename?: "UploadTicket";
  /** The object key to send back once the upload succeeded */
  key: Scalars["String"]["output"];
  /**
   * Short-lived signed URL to PUT the image bytes to. It pins the content type
   * the ticket was issued for
   */
  uploadUrl: Scalars["String"]["output"];
};

/** System user account with core identity information */
export type User = {
  __typename?: "User";
  /** Where to read this player's avatar. Null until they have uploaded one */
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  /** Timestamp when the user account was first created */
  createdAt: Scalars["DateTime"]["output"];
  /** Timestamp when the user account was soft-deleted, if applicable */
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** User's display name shown across the application */
  displayName: Scalars["String"]["output"];
  /** User's verified email address for communications */
  email: Scalars["String"]["output"];
  /** Reference ID linked to external systems or services */
  externalId: Scalars["ID"]["output"];
  /** Unique internal identifier for the user */
  id: Scalars["ID"]["output"];
  /**
   * The name the squad knows this player by. Null when unset, in which case
   * clients fall back to the first word of the display name
   */
  nickname?: Maybe<Scalars["String"]["output"]>;
  /** Reference to team membership for organizational structure */
  team?: Maybe<Team>;
  /** Timestamp when the user account was last modified */
  updatedAt: Scalars["DateTime"]["output"];
};

/** Represents a single vote cast by a user in a voting session, indicating their top and flop choices */
export type Vote = {
  __typename?: "Vote";
  /** Timestamp when the vote was first created */
  createdAt: Scalars["DateTime"]["output"];
  /** Timestamp when the vote was soft deleted */
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Optional description or comment for the vote */
  description?: Maybe<Scalars["String"]["output"]>;
  /** Unique internal identifier for the vote */
  id: Scalars["ID"]["output"];
  /** The type of vote (top or flop) */
  type: VoteType;
  /** Timestamp when the vote was last modified */
  updatedAt: Scalars["DateTime"]["output"];
  /** The user voted */
  voted: User;
  /** The user who cast this vote */
  voter: User;
  /** The voting session this vote belongs to */
  votingSession: VotingSession;
};

export enum VoteClosureReason {
  Admin = "ADMIN",
  Deadline = "DEADLINE",
  Unanimous = "UNANIMOUS",
}

export type VoteResult = {
  __typename?: "VoteResult";
  flop: User;
  top: User;
};

export enum VoteSessionStatus {
  Completed = "COMPLETED",
  InProgress = "IN_PROGRESS",
  NotStarted = "NOT_STARTED",
}

export enum VoteType {
  Flop = "FLOP",
  Top = "TOP",
}

export type VotingSession = {
  __typename?: "VotingSession";
  /** Ballot progress of every player on the match roster */
  ballots: Array<BallotProgress>;
  /** When the session actually closed. Null while it is open */
  closedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Why the session closed. Null while it is open */
  closedReason?: Maybe<VoteClosureReason>;
  /** Optional date and time when the voting session will close */
  closingAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Timestamp when the vote session was first created */
  createdAt: Scalars["DateTime"]["output"];
  /** Unique internal identifier for the voting session */
  id: Scalars["ID"]["output"];
  /** The match associated with this voting session */
  match: Match;
  /** User who initiated the voting session */
  startedBy: User;
  /** Current voting status of the session */
  status: VoteSessionStatus;
  /** The live count, one entry per player who has received at least one vote */
  tally: Array<TallyEntry>;
  /** The remaining time for an open voting session in seconds */
  timeRemaining: Scalars["Int"]["output"];
  /** Timestamp when the vote session was last modified */
  updatedAt: Scalars["DateTime"]["output"];
  /**
   * Results of the voting session, including the top and flop users. Null until
   * the session closes
   */
  voteResult?: Maybe<VoteResult>;
  /** Every vote cast so far, with its comment */
  votes: Array<Vote>;
};

export type SignUpMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  displayName: Scalars["String"]["input"];
  nickname?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "AuthPayload";
    refreshToken: string;
    accessToken: string;
    user: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
      email: string;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
      externalId: string;
      team?: {
        __typename?: "Team";
        id: string;
        name: string;
        code: string;
        sport?: string | null;
        crestUrl?: string | null;
        creator: {
          __typename?: "User";
          id: string;
          displayName: string;
          email: string;
          externalId: string;
        };
      } | null;
    };
  };
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "AuthPayload";
    refreshToken: string;
    accessToken: string;
    user: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
      externalId: string;
      email: string;
      team?: {
        __typename?: "Team";
        id: string;
        name: string;
        code: string;
        sport?: string | null;
        crestUrl?: string | null;
        creator: {
          __typename?: "User";
          id: string;
          displayName: string;
          externalId: string;
          email: string;
        };
      } | null;
    };
  };
};

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: {
    __typename?: "AuthTokens";
    accessToken: string;
    refreshToken: string;
    expiredAt: any;
  };
};

export type CreateTeamMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  sport?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateTeamMutation = {
  __typename?: "Mutation";
  createTeam: {
    __typename?: "Team";
    id: string;
    name: string;
    code: string;
    crestUrl?: string | null;
    createdAt: any;
    updatedAt: any;
    sport?: string | null;
    creator: {
      __typename?: "User";
      id: string;
      displayName: string;
      email: string;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
      externalId: string;
    };
  };
};

export type JoinTeamMutationVariables = Exact<{
  code: Scalars["String"]["input"];
}>;

export type JoinTeamMutation = {
  __typename?: "Mutation";
  joinTeam: {
    __typename?: "Team";
    id: string;
    name: string;
    code: string;
    sport?: string | null;
    crestUrl?: string | null;
    createdAt: any;
    updatedAt: any;
    creator: {
      __typename?: "User";
      id: string;
      displayName: string;
      email: string;
      createdAt: any;
      updatedAt: any;
      deletedAt?: any | null;
      externalId: string;
    };
  };
};

export type CreateMatchMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  date: Scalars["DateTime"]["input"];
  type: MatchType;
}>;

export type CreateMatchMutation = {
  __typename?: "Mutation";
  createMatch: {
    __typename?: "Match";
    id: string;
    name: string;
    date: any;
    type: MatchType;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    creator: { __typename?: "User"; displayName: string; email: string };
    team: { __typename?: "Team"; name: string; code: string };
    players: Array<{ __typename?: "User"; displayName: string; email: string }>;
    votingSession?: {
      __typename?: "VotingSession";
      status: VoteSessionStatus;
      timeRemaining: number;
      voteResult?: {
        __typename?: "VoteResult";
        flop: { __typename?: "User"; id: string; displayName: string };
        top: { __typename?: "User"; id: string; displayName: string };
      } | null;
    } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "Me";
    id: string;
    email: string;
    displayName: string;
    nickname?: string | null;
    avatarUrl?: string | null;
    team?: {
      __typename?: "Team";
      id: string;
      name: string;
      code: string;
      sport?: string | null;
      crestUrl?: string | null;
      creator: {
        __typename?: "User";
        id: string;
        displayName: string;
        externalId: string;
        email: string;
      };
    } | null;
  };
};

export type ValidateTeamCodeQueryVariables = Exact<{
  code: Scalars["String"]["input"];
}>;

export type ValidateTeamCodeQuery = {
  __typename?: "Query";
  validateTeamCode: boolean;
};

export type GetTeamMembersQueryVariables = Exact<{ [key: string]: never }>;

export type GetTeamMembersQuery = {
  __typename?: "Query";
  getTeamMembers: Array<{
    __typename?: "User";
    id: string;
    displayName: string;
    nickname?: string | null;
    avatarUrl?: string | null;
    email: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    externalId: string;
    team?: {
      __typename?: "Team";
      name: string;
      code: string;
      sport?: string | null;
      crestUrl?: string | null;
      createdAt: any;
      updatedAt: any;
      creator: { __typename?: "User"; displayName: string; email: string };
    } | null;
  }>;
};

export type TeamHistoryQueryVariables = Exact<{ [key: string]: never }>;

export type TeamHistoryQuery = {
  __typename?: "Query";
  me: {
    __typename?: "Me";
    id: string;
    team?: {
      __typename?: "Team";
      id: string;
      name: string;
      code: string;
      sport?: string | null;
      matches: Array<{
        __typename?: "Match";
        id: string;
        name: string;
        date: any;
        type: MatchType;
        players: Array<{
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        }>;
        votingSession?: {
          __typename?: "VotingSession";
          id: string;
          status: VoteSessionStatus;
          timeRemaining: number;
          voteResult?: {
            __typename?: "VoteResult";
            top: {
              __typename?: "User";
              id: string;
              displayName: string;
              nickname?: string | null;
              avatarUrl?: string | null;
            };
            flop: {
              __typename?: "User";
              id: string;
              displayName: string;
              nickname?: string | null;
              avatarUrl?: string | null;
            };
          } | null;
        } | null;
      } | null>;
    } | null;
  };
};

export type TeamVoteStateQueryVariables = Exact<{ [key: string]: never }>;

export type TeamVoteStateQuery = {
  __typename?: "Query";
  me: {
    __typename?: "Me";
    id: string;
    team?: {
      __typename?: "Team";
      id: string;
      matches: Array<{
        __typename?: "Match";
        id: string;
        name: string;
        date: any;
        votingSession?: {
          __typename?: "VotingSession";
          id: string;
          status: VoteSessionStatus;
          timeRemaining: number;
          ballots: Array<{
            __typename?: "BallotProgress";
            isComplete: boolean;
            player: { __typename?: "User"; id: string };
          }>;
        } | null;
      } | null>;
    } | null;
  };
};

export type UpdateProfileMutationVariables = Exact<{
  nickname?: InputMaybe<Scalars["String"]["input"]>;
  displayName?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "Me";
    id: string;
    displayName: string;
    nickname?: string | null;
    avatarUrl?: string | null;
    email: string;
  };
};

export type CreateAvatarUploadUrlMutationVariables = Exact<{
  contentType: Scalars["String"]["input"];
}>;

export type CreateAvatarUploadUrlMutation = {
  __typename?: "Mutation";
  createAvatarUploadUrl: {
    __typename?: "UploadTicket";
    uploadUrl: string;
    key: string;
  };
};

export type ConfirmAvatarUploadMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type ConfirmAvatarUploadMutation = {
  __typename?: "Mutation";
  confirmAvatarUpload: {
    __typename?: "Me";
    id: string;
    displayName: string;
    nickname?: string | null;
    avatarUrl?: string | null;
    email: string;
  };
};

export type CreateTeamCrestUploadUrlMutationVariables = Exact<{
  contentType: Scalars["String"]["input"];
}>;

export type CreateTeamCrestUploadUrlMutation = {
  __typename?: "Mutation";
  createTeamCrestUploadUrl: {
    __typename?: "UploadTicket";
    uploadUrl: string;
    key: string;
  };
};

export type ConfirmTeamCrestUploadMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type ConfirmTeamCrestUploadMutation = {
  __typename?: "Mutation";
  confirmTeamCrestUpload: {
    __typename?: "Team";
    id: string;
    name: string;
    code: string;
    sport?: string | null;
    crestUrl?: string | null;
  };
};

export type TeamRankingQueryVariables = Exact<{ [key: string]: never }>;

export type TeamRankingQuery = {
  __typename?: "Query";
  teamRanking: Array<{
    __typename?: "PlayerStanding";
    topCount: number;
    flopCount: number;
    player: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    };
  }>;
};

export type VotingSessionStateFragment = {
  __typename?: "VotingSession";
  id: string;
  status: VoteSessionStatus;
  timeRemaining: number;
  closingAt?: any | null;
  closedAt?: any | null;
  closedReason?: VoteClosureReason | null;
  startedBy: {
    __typename?: "User";
    id: string;
    displayName: string;
    nickname?: string | null;
  };
  match: { __typename?: "Match"; id: string; name: string; date: any };
  ballots: Array<{
    __typename?: "BallotProgress";
    hasTop: boolean;
    hasFlop: boolean;
    isComplete: boolean;
    player: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    };
  }>;
  tally: Array<{
    __typename?: "TallyEntry";
    topCount: number;
    flopCount: number;
    player: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    };
  }>;
  voteResult?: {
    __typename?: "VoteResult";
    top: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    };
    flop: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    };
  } | null;
};

export type SubmitVoteMutationVariables = Exact<{
  votingSession: Scalars["ID"]["input"];
  votedUserId: Scalars["ID"]["input"];
  type: VoteType;
  description?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type SubmitVoteMutation = {
  __typename?: "Mutation";
  submitVote: {
    __typename?: "Vote";
    id: string;
    type: VoteType;
    description?: string | null;
    voted: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
    };
  };
};

export type CreateVotingSessionMutationVariables = Exact<{
  matchId: Scalars["ID"]["input"];
  closingAt?: InputMaybe<Scalars["DateTime"]["input"]>;
}>;

export type CreateVotingSessionMutation = {
  __typename?: "Mutation";
  createVotingSession: {
    __typename?: "VotingSession";
    id: string;
    status: VoteSessionStatus;
    timeRemaining: number;
    closingAt?: any | null;
    closedAt?: any | null;
    closedReason?: VoteClosureReason | null;
    startedBy: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
    };
    match: { __typename?: "Match"; id: string; name: string; date: any };
    ballots: Array<{
      __typename?: "BallotProgress";
      hasTop: boolean;
      hasFlop: boolean;
      isComplete: boolean;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    tally: Array<{
      __typename?: "TallyEntry";
      topCount: number;
      flopCount: number;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    voteResult?: {
      __typename?: "VoteResult";
      top: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
      flop: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    } | null;
  };
};

export type CloseVotingSessionMutationVariables = Exact<{
  votingSessionId: Scalars["ID"]["input"];
}>;

export type CloseVotingSessionMutation = {
  __typename?: "Mutation";
  closeVotingSession: {
    __typename?: "VotingSession";
    id: string;
    status: VoteSessionStatus;
    timeRemaining: number;
    closingAt?: any | null;
    closedAt?: any | null;
    closedReason?: VoteClosureReason | null;
    startedBy: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
    };
    match: { __typename?: "Match"; id: string; name: string; date: any };
    ballots: Array<{
      __typename?: "BallotProgress";
      hasTop: boolean;
      hasFlop: boolean;
      isComplete: boolean;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    tally: Array<{
      __typename?: "TallyEntry";
      topCount: number;
      flopCount: number;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    voteResult?: {
      __typename?: "VoteResult";
      top: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
      flop: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    } | null;
  };
};

export type VoteMatchQueryVariables = Exact<{
  matchId: Scalars["ID"]["input"];
}>;

export type VoteMatchQuery = {
  __typename?: "Query";
  me: {
    __typename?: "Me";
    id: string;
    displayName: string;
    nickname?: string | null;
    avatarUrl?: string | null;
  };
  getMatchById: {
    __typename?: "Match";
    id: string;
    name: string;
    date: any;
    type: MatchType;
    players: Array<{
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
      avatarUrl?: string | null;
    }>;
    votingSession?: {
      __typename?: "VotingSession";
      id: string;
      status: VoteSessionStatus;
      timeRemaining: number;
      closingAt?: any | null;
      closedAt?: any | null;
      closedReason?: VoteClosureReason | null;
      startedBy: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
      };
      match: { __typename?: "Match"; id: string; name: string; date: any };
      ballots: Array<{
        __typename?: "BallotProgress";
        hasTop: boolean;
        hasFlop: boolean;
        isComplete: boolean;
        player: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
      }>;
      tally: Array<{
        __typename?: "TallyEntry";
        topCount: number;
        flopCount: number;
        player: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
      }>;
      voteResult?: {
        __typename?: "VoteResult";
        top: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
        flop: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
      } | null;
    } | null;
  };
};

export type MatchVoteHistoryQueryVariables = Exact<{
  matchId: Scalars["ID"]["input"];
}>;

export type MatchVoteHistoryQuery = {
  __typename?: "Query";
  getMatchById: {
    __typename?: "Match";
    id: string;
    votingSession?: {
      __typename?: "VotingSession";
      id: string;
      votes: Array<{
        __typename?: "Vote";
        id: string;
        type: VoteType;
        description?: string | null;
        createdAt: any;
        voter: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
        voted: {
          __typename?: "User";
          id: string;
          displayName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        };
      }>;
    } | null;
  };
};

export type VotingSessionUpdatedSubscriptionVariables = Exact<{
  votingSessionId: Scalars["ID"]["input"];
}>;

export type VotingSessionUpdatedSubscription = {
  __typename?: "Subscription";
  votingSessionUpdated: {
    __typename?: "VotingSession";
    id: string;
    status: VoteSessionStatus;
    timeRemaining: number;
    closingAt?: any | null;
    closedAt?: any | null;
    closedReason?: VoteClosureReason | null;
    startedBy: {
      __typename?: "User";
      id: string;
      displayName: string;
      nickname?: string | null;
    };
    match: { __typename?: "Match"; id: string; name: string; date: any };
    ballots: Array<{
      __typename?: "BallotProgress";
      hasTop: boolean;
      hasFlop: boolean;
      isComplete: boolean;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    tally: Array<{
      __typename?: "TallyEntry";
      topCount: number;
      flopCount: number;
      player: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    }>;
    voteResult?: {
      __typename?: "VoteResult";
      top: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
      flop: {
        __typename?: "User";
        id: string;
        displayName: string;
        nickname?: string | null;
        avatarUrl?: string | null;
      };
    } | null;
  };
};

export const VotingSessionStateFragmentDoc = gql`
  fragment VotingSessionState on VotingSession {
    id
    status
    timeRemaining
    closingAt
    closedAt
    closedReason
    startedBy {
      id
      displayName
      nickname
    }
    match {
      id
      name
      date
    }
    ballots {
      player {
        id
        displayName
        nickname
        avatarUrl
      }
      hasTop
      hasFlop
      isComplete
    }
    tally {
      player {
        id
        displayName
        nickname
        avatarUrl
      }
      topCount
      flopCount
    }
    voteResult {
      top {
        id
        displayName
        nickname
        avatarUrl
      }
      flop {
        id
        displayName
        nickname
        avatarUrl
      }
    }
  }
`;
export const SignUpDocument = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $displayName: String!
    $nickname: String
  ) {
    createUser(
      email: $email
      password: $password
      displayName: $displayName
      nickname: $nickname
    ) {
      user {
        id
        displayName
        nickname
        avatarUrl
        email
        createdAt
        updatedAt
        deletedAt
        externalId
        team {
          id
          name
          code
          sport
          crestUrl
          creator {
            id
            displayName
            email
            externalId
          }
        }
      }
      refreshToken
      accessToken
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      displayName: // value for 'displayName'
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        displayName
        nickname
        avatarUrl
        createdAt
        updatedAt
        deletedAt
        externalId
        email
        team {
          id
          name
          code
          sport
          crestUrl
          creator {
            id
            displayName
            externalId
            email
          }
        }
      }
      refreshToken
      accessToken
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
      expiredAt
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const CreateTeamDocument = gql`
  mutation CreateTeam($name: String!, $sport: String) {
    createTeam(name: $name, sport: $sport) {
      id
      name
      code
      crestUrl
      creator {
        id
        displayName
        email
        createdAt
        updatedAt
        deletedAt
        externalId
      }
      createdAt
      updatedAt
      sport
    }
  }
`;
export type CreateTeamMutationFn = Apollo.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      sport: // value for 'sport'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(
    CreateTeamDocument,
    options
  );
}
export type CreateTeamMutationHookResult = ReturnType<
  typeof useCreateTeamMutation
>;
export type CreateTeamMutationResult =
  Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;
export const JoinTeamDocument = gql`
  mutation JoinTeam($code: String!) {
    joinTeam(code: $code) {
      id
      name
      code
      sport
      crestUrl
      creator {
        id
        displayName
        email
        createdAt
        updatedAt
        deletedAt
        externalId
      }
      createdAt
      updatedAt
    }
  }
`;
export type JoinTeamMutationFn = Apollo.MutationFunction<
  JoinTeamMutation,
  JoinTeamMutationVariables
>;

/**
 * __useJoinTeamMutation__
 *
 * To run a mutation, you first call `useJoinTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTeamMutation, { data, loading, error }] = useJoinTeamMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useJoinTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinTeamMutation,
    JoinTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<JoinTeamMutation, JoinTeamMutationVariables>(
    JoinTeamDocument,
    options
  );
}
export type JoinTeamMutationHookResult = ReturnType<typeof useJoinTeamMutation>;
export type JoinTeamMutationResult = Apollo.MutationResult<JoinTeamMutation>;
export type JoinTeamMutationOptions = Apollo.BaseMutationOptions<
  JoinTeamMutation,
  JoinTeamMutationVariables
>;
export const CreateMatchDocument = gql`
  mutation CreateMatch($name: String!, $date: DateTime!, $type: MatchType!) {
    createMatch(name: $name, date: $date, type: $type) {
      id
      name
      date
      type
      creator {
        displayName
        email
      }
      team {
        name
        code
      }
      createdAt
      updatedAt
      deletedAt
      players {
        displayName
        email
      }
      votingSession {
        status
        timeRemaining
        voteResult {
          flop {
            id
            displayName
          }
          top {
            id
            displayName
          }
        }
      }
    }
  }
`;
export type CreateMatchMutationFn = Apollo.MutationFunction<
  CreateMatchMutation,
  CreateMatchMutationVariables
>;

/**
 * __useCreateMatchMutation__
 *
 * To run a mutation, you first call `useCreateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMatchMutation, { data, loading, error }] = useCreateMatchMutation({
 *   variables: {
 *      name: // value for 'name'
 *      date: // value for 'date'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMatchMutation,
    CreateMatchMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMatchMutation, CreateMatchMutationVariables>(
    CreateMatchDocument,
    options
  );
}
export type CreateMatchMutationHookResult = ReturnType<
  typeof useCreateMatchMutation
>;
export type CreateMatchMutationResult =
  Apollo.MutationResult<CreateMatchMutation>;
export type CreateMatchMutationOptions = Apollo.BaseMutationOptions<
  CreateMatchMutation,
  CreateMatchMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      displayName
      nickname
      avatarUrl
      team {
        id
        name
        code
        sport
        crestUrl
        creator {
          id
          displayName
          externalId
          email
        }
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
// @ts-ignore
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>
): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>
): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ValidateTeamCodeDocument = gql`
  query validateTeamCode($code: String!) {
    validateTeamCode(code: $code)
  }
`;

/**
 * __useValidateTeamCodeQuery__
 *
 * To run a query within a React component, call `useValidateTeamCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTeamCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTeamCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useValidateTeamCodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    ValidateTeamCodeQuery,
    ValidateTeamCodeQueryVariables
  > &
    (
      | { variables: ValidateTeamCodeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>(
    ValidateTeamCodeDocument,
    options
  );
}
export function useValidateTeamCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidateTeamCodeQuery,
    ValidateTeamCodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ValidateTeamCodeQuery,
    ValidateTeamCodeQueryVariables
  >(ValidateTeamCodeDocument, options);
}
// @ts-ignore
export function useValidateTeamCodeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ValidateTeamCodeQuery,
    ValidateTeamCodeQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  ValidateTeamCodeQuery,
  ValidateTeamCodeQueryVariables
>;
export function useValidateTeamCodeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ValidateTeamCodeQuery,
        ValidateTeamCodeQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  ValidateTeamCodeQuery | undefined,
  ValidateTeamCodeQueryVariables
>;
export function useValidateTeamCodeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ValidateTeamCodeQuery,
        ValidateTeamCodeQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ValidateTeamCodeQuery,
    ValidateTeamCodeQueryVariables
  >(ValidateTeamCodeDocument, options);
}
export type ValidateTeamCodeQueryHookResult = ReturnType<
  typeof useValidateTeamCodeQuery
>;
export type ValidateTeamCodeLazyQueryHookResult = ReturnType<
  typeof useValidateTeamCodeLazyQuery
>;
export type ValidateTeamCodeSuspenseQueryHookResult = ReturnType<
  typeof useValidateTeamCodeSuspenseQuery
>;
export type ValidateTeamCodeQueryResult = Apollo.QueryResult<
  ValidateTeamCodeQuery,
  ValidateTeamCodeQueryVariables
>;
export const GetTeamMembersDocument = gql`
  query GetTeamMembers {
    getTeamMembers {
      id
      displayName
      nickname
      avatarUrl
      email
      createdAt
      updatedAt
      deletedAt
      externalId
      team {
        name
        code
        sport
        crestUrl
        creator {
          displayName
          email
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTeamMembersQuery,
    GetTeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(
    GetTeamMembersDocument,
    options
  );
}
export function useGetTeamMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTeamMembersQuery,
    GetTeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(
    GetTeamMembersDocument,
    options
  );
}
// @ts-ignore
export function useGetTeamMembersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetTeamMembersQuery,
    GetTeamMembersQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  GetTeamMembersQuery,
  GetTeamMembersQueryVariables
>;
export function useGetTeamMembersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetTeamMembersQuery,
        GetTeamMembersQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetTeamMembersQuery | undefined,
  GetTeamMembersQueryVariables
>;
export function useGetTeamMembersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetTeamMembersQuery,
        GetTeamMembersQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetTeamMembersQuery,
    GetTeamMembersQueryVariables
  >(GetTeamMembersDocument, options);
}
export type GetTeamMembersQueryHookResult = ReturnType<
  typeof useGetTeamMembersQuery
>;
export type GetTeamMembersLazyQueryHookResult = ReturnType<
  typeof useGetTeamMembersLazyQuery
>;
export type GetTeamMembersSuspenseQueryHookResult = ReturnType<
  typeof useGetTeamMembersSuspenseQuery
>;
export type GetTeamMembersQueryResult = Apollo.QueryResult<
  GetTeamMembersQuery,
  GetTeamMembersQueryVariables
>;
export const TeamHistoryDocument = gql`
  query TeamHistory {
    me {
      id
      team {
        id
        name
        code
        sport
        matches {
          id
          name
          date
          type
          players {
            id
            displayName
            nickname
            avatarUrl
          }
          votingSession {
            id
            status
            timeRemaining
            voteResult {
              top {
                id
                displayName
                nickname
                avatarUrl
              }
              flop {
                id
                displayName
                nickname
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useTeamHistoryQuery__
 *
 * To run a query within a React component, call `useTeamHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TeamHistoryQuery,
    TeamHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TeamHistoryQuery, TeamHistoryQueryVariables>(
    TeamHistoryDocument,
    options
  );
}
export function useTeamHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TeamHistoryQuery,
    TeamHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TeamHistoryQuery, TeamHistoryQueryVariables>(
    TeamHistoryDocument,
    options
  );
}
// @ts-ignore
export function useTeamHistorySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TeamHistoryQuery,
    TeamHistoryQueryVariables
  >
): Apollo.UseSuspenseQueryResult<TeamHistoryQuery, TeamHistoryQueryVariables>;
export function useTeamHistorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamHistoryQuery,
        TeamHistoryQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  TeamHistoryQuery | undefined,
  TeamHistoryQueryVariables
>;
export function useTeamHistorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamHistoryQuery,
        TeamHistoryQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TeamHistoryQuery, TeamHistoryQueryVariables>(
    TeamHistoryDocument,
    options
  );
}
export type TeamHistoryQueryHookResult = ReturnType<typeof useTeamHistoryQuery>;
export type TeamHistoryLazyQueryHookResult = ReturnType<
  typeof useTeamHistoryLazyQuery
>;
export type TeamHistorySuspenseQueryHookResult = ReturnType<
  typeof useTeamHistorySuspenseQuery
>;
export type TeamHistoryQueryResult = Apollo.QueryResult<
  TeamHistoryQuery,
  TeamHistoryQueryVariables
>;
export const TeamVoteStateDocument = gql`
  query TeamVoteState {
    me {
      id
      team {
        id
        matches {
          id
          name
          date
          votingSession {
            id
            status
            timeRemaining
            ballots {
              player {
                id
              }
              isComplete
            }
          }
        }
      }
    }
  }
`;

/**
 * __useTeamVoteStateQuery__
 *
 * To run a query within a React component, call `useTeamVoteStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamVoteStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamVoteStateQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamVoteStateQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TeamVoteStateQuery,
    TeamVoteStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TeamVoteStateQuery, TeamVoteStateQueryVariables>(
    TeamVoteStateDocument,
    options
  );
}
export function useTeamVoteStateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TeamVoteStateQuery,
    TeamVoteStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TeamVoteStateQuery, TeamVoteStateQueryVariables>(
    TeamVoteStateDocument,
    options
  );
}
// @ts-ignore
export function useTeamVoteStateSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TeamVoteStateQuery,
    TeamVoteStateQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  TeamVoteStateQuery,
  TeamVoteStateQueryVariables
>;
export function useTeamVoteStateSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamVoteStateQuery,
        TeamVoteStateQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  TeamVoteStateQuery | undefined,
  TeamVoteStateQueryVariables
>;
export function useTeamVoteStateSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamVoteStateQuery,
        TeamVoteStateQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TeamVoteStateQuery,
    TeamVoteStateQueryVariables
  >(TeamVoteStateDocument, options);
}
export type TeamVoteStateQueryHookResult = ReturnType<
  typeof useTeamVoteStateQuery
>;
export type TeamVoteStateLazyQueryHookResult = ReturnType<
  typeof useTeamVoteStateLazyQuery
>;
export type TeamVoteStateSuspenseQueryHookResult = ReturnType<
  typeof useTeamVoteStateSuspenseQuery
>;
export type TeamVoteStateQueryResult = Apollo.QueryResult<
  TeamVoteStateQuery,
  TeamVoteStateQueryVariables
>;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($nickname: String, $displayName: String) {
    updateProfile(nickname: $nickname, displayName: $displayName) {
      id
      displayName
      nickname
      avatarUrl
      email
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      nickname: // value for 'nickname'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const CreateAvatarUploadUrlDocument = gql`
  mutation CreateAvatarUploadUrl($contentType: String!) {
    createAvatarUploadUrl(contentType: $contentType) {
      uploadUrl
      key
    }
  }
`;
export type CreateAvatarUploadUrlMutationFn = Apollo.MutationFunction<
  CreateAvatarUploadUrlMutation,
  CreateAvatarUploadUrlMutationVariables
>;

/**
 * __useCreateAvatarUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateAvatarUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAvatarUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAvatarUploadUrlMutation, { data, loading, error }] = useCreateAvatarUploadUrlMutation({
 *   variables: {
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useCreateAvatarUploadUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAvatarUploadUrlMutation,
    CreateAvatarUploadUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAvatarUploadUrlMutation,
    CreateAvatarUploadUrlMutationVariables
  >(CreateAvatarUploadUrlDocument, options);
}
export type CreateAvatarUploadUrlMutationHookResult = ReturnType<
  typeof useCreateAvatarUploadUrlMutation
>;
export type CreateAvatarUploadUrlMutationResult =
  Apollo.MutationResult<CreateAvatarUploadUrlMutation>;
export type CreateAvatarUploadUrlMutationOptions = Apollo.BaseMutationOptions<
  CreateAvatarUploadUrlMutation,
  CreateAvatarUploadUrlMutationVariables
>;
export const ConfirmAvatarUploadDocument = gql`
  mutation ConfirmAvatarUpload($key: String!) {
    confirmAvatarUpload(key: $key) {
      id
      displayName
      nickname
      avatarUrl
      email
    }
  }
`;
export type ConfirmAvatarUploadMutationFn = Apollo.MutationFunction<
  ConfirmAvatarUploadMutation,
  ConfirmAvatarUploadMutationVariables
>;

/**
 * __useConfirmAvatarUploadMutation__
 *
 * To run a mutation, you first call `useConfirmAvatarUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAvatarUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAvatarUploadMutation, { data, loading, error }] = useConfirmAvatarUploadMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useConfirmAvatarUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmAvatarUploadMutation,
    ConfirmAvatarUploadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmAvatarUploadMutation,
    ConfirmAvatarUploadMutationVariables
  >(ConfirmAvatarUploadDocument, options);
}
export type ConfirmAvatarUploadMutationHookResult = ReturnType<
  typeof useConfirmAvatarUploadMutation
>;
export type ConfirmAvatarUploadMutationResult =
  Apollo.MutationResult<ConfirmAvatarUploadMutation>;
export type ConfirmAvatarUploadMutationOptions = Apollo.BaseMutationOptions<
  ConfirmAvatarUploadMutation,
  ConfirmAvatarUploadMutationVariables
>;
export const CreateTeamCrestUploadUrlDocument = gql`
  mutation CreateTeamCrestUploadUrl($contentType: String!) {
    createTeamCrestUploadUrl(contentType: $contentType) {
      uploadUrl
      key
    }
  }
`;
export type CreateTeamCrestUploadUrlMutationFn = Apollo.MutationFunction<
  CreateTeamCrestUploadUrlMutation,
  CreateTeamCrestUploadUrlMutationVariables
>;

/**
 * __useCreateTeamCrestUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateTeamCrestUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamCrestUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamCrestUploadUrlMutation, { data, loading, error }] = useCreateTeamCrestUploadUrlMutation({
 *   variables: {
 *      contentType: // value for 'contentType'
 *   },
 * });
 */
export function useCreateTeamCrestUploadUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTeamCrestUploadUrlMutation,
    CreateTeamCrestUploadUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTeamCrestUploadUrlMutation,
    CreateTeamCrestUploadUrlMutationVariables
  >(CreateTeamCrestUploadUrlDocument, options);
}
export type CreateTeamCrestUploadUrlMutationHookResult = ReturnType<
  typeof useCreateTeamCrestUploadUrlMutation
>;
export type CreateTeamCrestUploadUrlMutationResult =
  Apollo.MutationResult<CreateTeamCrestUploadUrlMutation>;
export type CreateTeamCrestUploadUrlMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTeamCrestUploadUrlMutation,
    CreateTeamCrestUploadUrlMutationVariables
  >;
export const ConfirmTeamCrestUploadDocument = gql`
  mutation ConfirmTeamCrestUpload($key: String!) {
    confirmTeamCrestUpload(key: $key) {
      id
      name
      code
      sport
      crestUrl
    }
  }
`;
export type ConfirmTeamCrestUploadMutationFn = Apollo.MutationFunction<
  ConfirmTeamCrestUploadMutation,
  ConfirmTeamCrestUploadMutationVariables
>;

/**
 * __useConfirmTeamCrestUploadMutation__
 *
 * To run a mutation, you first call `useConfirmTeamCrestUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmTeamCrestUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmTeamCrestUploadMutation, { data, loading, error }] = useConfirmTeamCrestUploadMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useConfirmTeamCrestUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmTeamCrestUploadMutation,
    ConfirmTeamCrestUploadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmTeamCrestUploadMutation,
    ConfirmTeamCrestUploadMutationVariables
  >(ConfirmTeamCrestUploadDocument, options);
}
export type ConfirmTeamCrestUploadMutationHookResult = ReturnType<
  typeof useConfirmTeamCrestUploadMutation
>;
export type ConfirmTeamCrestUploadMutationResult =
  Apollo.MutationResult<ConfirmTeamCrestUploadMutation>;
export type ConfirmTeamCrestUploadMutationOptions = Apollo.BaseMutationOptions<
  ConfirmTeamCrestUploadMutation,
  ConfirmTeamCrestUploadMutationVariables
>;
export const TeamRankingDocument = gql`
  query TeamRanking {
    teamRanking {
      topCount
      flopCount
      player {
        id
        displayName
        nickname
        avatarUrl
      }
    }
  }
`;

/**
 * __useTeamRankingQuery__
 *
 * To run a query within a React component, call `useTeamRankingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamRankingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamRankingQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamRankingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TeamRankingQuery,
    TeamRankingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TeamRankingQuery, TeamRankingQueryVariables>(
    TeamRankingDocument,
    options
  );
}
export function useTeamRankingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TeamRankingQuery,
    TeamRankingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TeamRankingQuery, TeamRankingQueryVariables>(
    TeamRankingDocument,
    options
  );
}
// @ts-ignore
export function useTeamRankingSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    TeamRankingQuery,
    TeamRankingQueryVariables
  >
): Apollo.UseSuspenseQueryResult<TeamRankingQuery, TeamRankingQueryVariables>;
export function useTeamRankingSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamRankingQuery,
        TeamRankingQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  TeamRankingQuery | undefined,
  TeamRankingQueryVariables
>;
export function useTeamRankingSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TeamRankingQuery,
        TeamRankingQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TeamRankingQuery, TeamRankingQueryVariables>(
    TeamRankingDocument,
    options
  );
}
export type TeamRankingQueryHookResult = ReturnType<typeof useTeamRankingQuery>;
export type TeamRankingLazyQueryHookResult = ReturnType<
  typeof useTeamRankingLazyQuery
>;
export type TeamRankingSuspenseQueryHookResult = ReturnType<
  typeof useTeamRankingSuspenseQuery
>;
export type TeamRankingQueryResult = Apollo.QueryResult<
  TeamRankingQuery,
  TeamRankingQueryVariables
>;
export const SubmitVoteDocument = gql`
  mutation SubmitVote(
    $votingSession: ID!
    $votedUserId: ID!
    $type: VoteType!
    $description: String
  ) {
    submitVote(
      votingSession: $votingSession
      votedUserId: $votedUserId
      type: $type
      description: $description
    ) {
      id
      type
      description
      voted {
        id
        displayName
        nickname
      }
    }
  }
`;
export type SubmitVoteMutationFn = Apollo.MutationFunction<
  SubmitVoteMutation,
  SubmitVoteMutationVariables
>;

/**
 * __useSubmitVoteMutation__
 *
 * To run a mutation, you first call `useSubmitVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitVoteMutation, { data, loading, error }] = useSubmitVoteMutation({
 *   variables: {
 *      votingSession: // value for 'votingSession'
 *      votedUserId: // value for 'votedUserId'
 *      type: // value for 'type'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useSubmitVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitVoteMutation,
    SubmitVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SubmitVoteMutation, SubmitVoteMutationVariables>(
    SubmitVoteDocument,
    options
  );
}
export type SubmitVoteMutationHookResult = ReturnType<
  typeof useSubmitVoteMutation
>;
export type SubmitVoteMutationResult =
  Apollo.MutationResult<SubmitVoteMutation>;
export type SubmitVoteMutationOptions = Apollo.BaseMutationOptions<
  SubmitVoteMutation,
  SubmitVoteMutationVariables
>;
export const CreateVotingSessionDocument = gql`
  mutation CreateVotingSession($matchId: ID!, $closingAt: DateTime) {
    createVotingSession(matchId: $matchId, closingAt: $closingAt) {
      ...VotingSessionState
    }
  }
  ${VotingSessionStateFragmentDoc}
`;
export type CreateVotingSessionMutationFn = Apollo.MutationFunction<
  CreateVotingSessionMutation,
  CreateVotingSessionMutationVariables
>;

/**
 * __useCreateVotingSessionMutation__
 *
 * To run a mutation, you first call `useCreateVotingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVotingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVotingSessionMutation, { data, loading, error }] = useCreateVotingSessionMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *      closingAt: // value for 'closingAt'
 *   },
 * });
 */
export function useCreateVotingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVotingSessionMutation,
    CreateVotingSessionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateVotingSessionMutation,
    CreateVotingSessionMutationVariables
  >(CreateVotingSessionDocument, options);
}
export type CreateVotingSessionMutationHookResult = ReturnType<
  typeof useCreateVotingSessionMutation
>;
export type CreateVotingSessionMutationResult =
  Apollo.MutationResult<CreateVotingSessionMutation>;
export type CreateVotingSessionMutationOptions = Apollo.BaseMutationOptions<
  CreateVotingSessionMutation,
  CreateVotingSessionMutationVariables
>;
export const CloseVotingSessionDocument = gql`
  mutation CloseVotingSession($votingSessionId: ID!) {
    closeVotingSession(votingSessionId: $votingSessionId) {
      ...VotingSessionState
    }
  }
  ${VotingSessionStateFragmentDoc}
`;
export type CloseVotingSessionMutationFn = Apollo.MutationFunction<
  CloseVotingSessionMutation,
  CloseVotingSessionMutationVariables
>;

/**
 * __useCloseVotingSessionMutation__
 *
 * To run a mutation, you first call `useCloseVotingSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseVotingSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeVotingSessionMutation, { data, loading, error }] = useCloseVotingSessionMutation({
 *   variables: {
 *      votingSessionId: // value for 'votingSessionId'
 *   },
 * });
 */
export function useCloseVotingSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CloseVotingSessionMutation,
    CloseVotingSessionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CloseVotingSessionMutation,
    CloseVotingSessionMutationVariables
  >(CloseVotingSessionDocument, options);
}
export type CloseVotingSessionMutationHookResult = ReturnType<
  typeof useCloseVotingSessionMutation
>;
export type CloseVotingSessionMutationResult =
  Apollo.MutationResult<CloseVotingSessionMutation>;
export type CloseVotingSessionMutationOptions = Apollo.BaseMutationOptions<
  CloseVotingSessionMutation,
  CloseVotingSessionMutationVariables
>;
export const VoteMatchDocument = gql`
  query VoteMatch($matchId: ID!) {
    me {
      id
      displayName
      nickname
      avatarUrl
    }
    getMatchById(matchId: $matchId) {
      id
      name
      date
      type
      players {
        id
        displayName
        nickname
        avatarUrl
      }
      votingSession {
        ...VotingSessionState
      }
    }
  }
  ${VotingSessionStateFragmentDoc}
`;

/**
 * __useVoteMatchQuery__
 *
 * To run a query within a React component, call `useVoteMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoteMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteMatchQuery({
 *   variables: {
 *      matchId: // value for 'matchId'
 *   },
 * });
 */
export function useVoteMatchQuery(
  baseOptions: Apollo.QueryHookOptions<
    VoteMatchQuery,
    VoteMatchQueryVariables
  > &
    ({ variables: VoteMatchQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VoteMatchQuery, VoteMatchQueryVariables>(
    VoteMatchDocument,
    options
  );
}
export function useVoteMatchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VoteMatchQuery,
    VoteMatchQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VoteMatchQuery, VoteMatchQueryVariables>(
    VoteMatchDocument,
    options
  );
}
// @ts-ignore
export function useVoteMatchSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    VoteMatchQuery,
    VoteMatchQueryVariables
  >
): Apollo.UseSuspenseQueryResult<VoteMatchQuery, VoteMatchQueryVariables>;
export function useVoteMatchSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<VoteMatchQuery, VoteMatchQueryVariables>
): Apollo.UseSuspenseQueryResult<
  VoteMatchQuery | undefined,
  VoteMatchQueryVariables
>;
export function useVoteMatchSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<VoteMatchQuery, VoteMatchQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<VoteMatchQuery, VoteMatchQueryVariables>(
    VoteMatchDocument,
    options
  );
}
export type VoteMatchQueryHookResult = ReturnType<typeof useVoteMatchQuery>;
export type VoteMatchLazyQueryHookResult = ReturnType<
  typeof useVoteMatchLazyQuery
>;
export type VoteMatchSuspenseQueryHookResult = ReturnType<
  typeof useVoteMatchSuspenseQuery
>;
export type VoteMatchQueryResult = Apollo.QueryResult<
  VoteMatchQuery,
  VoteMatchQueryVariables
>;
export const MatchVoteHistoryDocument = gql`
  query MatchVoteHistory($matchId: ID!) {
    getMatchById(matchId: $matchId) {
      id
      votingSession {
        id
        votes {
          id
          type
          description
          createdAt
          voter {
            id
            displayName
            nickname
            avatarUrl
          }
          voted {
            id
            displayName
            nickname
            avatarUrl
          }
        }
      }
    }
  }
`;

/**
 * __useMatchVoteHistoryQuery__
 *
 * To run a query within a React component, call `useMatchVoteHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchVoteHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchVoteHistoryQuery({
 *   variables: {
 *      matchId: // value for 'matchId'
 *   },
 * });
 */
export function useMatchVoteHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    MatchVoteHistoryQuery,
    MatchVoteHistoryQueryVariables
  > &
    (
      | { variables: MatchVoteHistoryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MatchVoteHistoryQuery, MatchVoteHistoryQueryVariables>(
    MatchVoteHistoryDocument,
    options
  );
}
export function useMatchVoteHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MatchVoteHistoryQuery,
    MatchVoteHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    MatchVoteHistoryQuery,
    MatchVoteHistoryQueryVariables
  >(MatchVoteHistoryDocument, options);
}
// @ts-ignore
export function useMatchVoteHistorySuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    MatchVoteHistoryQuery,
    MatchVoteHistoryQueryVariables
  >
): Apollo.UseSuspenseQueryResult<
  MatchVoteHistoryQuery,
  MatchVoteHistoryQueryVariables
>;
export function useMatchVoteHistorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MatchVoteHistoryQuery,
        MatchVoteHistoryQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  MatchVoteHistoryQuery | undefined,
  MatchVoteHistoryQueryVariables
>;
export function useMatchVoteHistorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MatchVoteHistoryQuery,
        MatchVoteHistoryQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    MatchVoteHistoryQuery,
    MatchVoteHistoryQueryVariables
  >(MatchVoteHistoryDocument, options);
}
export type MatchVoteHistoryQueryHookResult = ReturnType<
  typeof useMatchVoteHistoryQuery
>;
export type MatchVoteHistoryLazyQueryHookResult = ReturnType<
  typeof useMatchVoteHistoryLazyQuery
>;
export type MatchVoteHistorySuspenseQueryHookResult = ReturnType<
  typeof useMatchVoteHistorySuspenseQuery
>;
export type MatchVoteHistoryQueryResult = Apollo.QueryResult<
  MatchVoteHistoryQuery,
  MatchVoteHistoryQueryVariables
>;
export const VotingSessionUpdatedDocument = gql`
  subscription VotingSessionUpdated($votingSessionId: ID!) {
    votingSessionUpdated(votingSessionId: $votingSessionId) {
      ...VotingSessionState
    }
  }
  ${VotingSessionStateFragmentDoc}
`;

/**
 * __useVotingSessionUpdatedSubscription__
 *
 * To run a query within a React component, call `useVotingSessionUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVotingSessionUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotingSessionUpdatedSubscription({
 *   variables: {
 *      votingSessionId: // value for 'votingSessionId'
 *   },
 * });
 */
export function useVotingSessionUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    VotingSessionUpdatedSubscription,
    VotingSessionUpdatedSubscriptionVariables
  > &
    (
      | { variables: VotingSessionUpdatedSubscriptionVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    VotingSessionUpdatedSubscription,
    VotingSessionUpdatedSubscriptionVariables
  >(VotingSessionUpdatedDocument, options);
}
export type VotingSessionUpdatedSubscriptionHookResult = ReturnType<
  typeof useVotingSessionUpdatedSubscription
>;
export type VotingSessionUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<VotingSessionUpdatedSubscription>;
