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
  /** User's name displayed throughout the interface */
  displayName: Scalars['String']['output'];
  /** Primary email address of the authenticated user */
  email: Scalars['String']['output'];
  /** Unique identifier of the authenticated user */
  id: Scalars['ID']['output'];
  /** Organization team identifier the user belongs to */
  team?: Maybe<Team>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new Match with a specified name and date */
  createMatch: Match;
  /** Creates a new team with a specified name and optional sport */
  createTeam: Team;
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


export type MutationCreateUserArgs = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
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


export type QueryValidateTeamCodeArgs = {
  code: Scalars['String']['input'];
};

/** Input used to obtain access tokens without re-authentication */
export type RefreshTokenInput = {
  /** Token used to obtain new access tokens without re-authentication */
  refreshToken: Scalars['String']['input'];
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

/** System user account with core identity information */
export type User = {
  __typename?: 'User';
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
  /** Reference to team membership for organizational structure */
  team?: Maybe<Team>;
  /** Timestamp when the user account was last modified */
  updatedAt: Scalars['DateTime']['output'];
};

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

export type VotingSession = {
  __typename?: 'VotingSession';
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
  /** The remaining time for an open voting session in seconds */
  timeRemaining: Scalars['Int']['output'];
  /** Timestamp when the vote session was last modified */
  updatedAt: Scalars['DateTime']['output'];
  /** Results of the voting session, including the top and flop users */
  voteResult?: Maybe<VoteResult>;
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AuthPayload', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, creator: { __typename?: 'User', id: string, displayName: string, email: string, externalId: string } } | null } } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthPayload', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: string, displayName: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, email: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, creator: { __typename?: 'User', id: string, displayName: string, externalId: string, email: string } } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthTokens', accessToken: string, refreshToken: string, expiredAt: any } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  sport?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, code: string, createdAt: any, updatedAt: any, sport?: string | null, creator: { __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string } } };

export type JoinTeamMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type JoinTeamMutation = { __typename?: 'Mutation', joinTeam: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, createdAt: any, updatedAt: any, creator: { __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string } } };

export type CreateMatchMutationVariables = Exact<{
  name: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  type: MatchType;
}>;


export type CreateMatchMutation = { __typename?: 'Mutation', createMatch: { __typename?: 'Match', id: string, name: string, date: any, type: MatchType, createdAt: any, updatedAt: any, deletedAt?: any | null, creator: { __typename?: 'User', displayName: string, email: string }, team: { __typename?: 'Team', name: string, code: string }, players: Array<{ __typename?: 'User', displayName: string, email: string }>, votingSession?: { __typename?: 'VotingSession', status: VoteSessionStatus, timeRemaining: number, voteResult?: { __typename?: 'VoteResult', flop: { __typename?: 'User', id: string, displayName: string }, top: { __typename?: 'User', id: string, displayName: string } } | null } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Me', id: string, email: string, displayName: string, team?: { __typename?: 'Team', id: string, name: string, code: string, sport?: string | null, creator: { __typename?: 'User', id: string, displayName: string, externalId: string, email: string } } | null } };

export type ValidateTeamCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ValidateTeamCodeQuery = { __typename?: 'Query', validateTeamCode: boolean };

export type GetTeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeamMembers: Array<{ __typename?: 'User', id: string, displayName: string, email: string, createdAt: any, updatedAt: any, deletedAt?: any | null, externalId: string, team?: { __typename?: 'Team', name: string, code: string, sport?: string | null, createdAt: any, updatedAt: any, creator: { __typename?: 'User', displayName: string, email: string } } | null }> };


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"displayName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"displayName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sport"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"sport"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sport"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const JoinTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const CreateMatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votingSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeRemaining"}},{"kind":"Field","name":{"kind":"Name","value":"voteResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"top"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMatchMutation, CreateMatchMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ValidateTeamCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"validateTeamCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateTeamCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>;
export const GetTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"sport"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamMembersQuery, GetTeamMembersQueryVariables>;