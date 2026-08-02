import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
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


export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!, $displayName: String!) {
  createUser(email: $email, password: $password, displayName: $displayName) {
    user {
      id
      displayName
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
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    user {
      id
      displayName
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
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    accessToken
    refreshToken
    expiredAt
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

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
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $sport: String) {
  createTeam(name: $name, sport: $sport) {
    id
    name
    code
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
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

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
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const JoinTeamDocument = gql`
    mutation JoinTeam($code: String!) {
  joinTeam(code: $code) {
    id
    name
    code
    sport
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
export type JoinTeamMutationFn = Apollo.MutationFunction<JoinTeamMutation, JoinTeamMutationVariables>;

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
export function useJoinTeamMutation(baseOptions?: Apollo.MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinTeamMutation, JoinTeamMutationVariables>(JoinTeamDocument, options);
      }
export type JoinTeamMutationHookResult = ReturnType<typeof useJoinTeamMutation>;
export type JoinTeamMutationResult = Apollo.MutationResult<JoinTeamMutation>;
export type JoinTeamMutationOptions = Apollo.BaseMutationOptions<JoinTeamMutation, JoinTeamMutationVariables>;
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
export type CreateMatchMutationFn = Apollo.MutationFunction<CreateMatchMutation, CreateMatchMutationVariables>;

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
export function useCreateMatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateMatchMutation, CreateMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMatchMutation, CreateMatchMutationVariables>(CreateMatchDocument, options);
      }
export type CreateMatchMutationHookResult = ReturnType<typeof useCreateMatchMutation>;
export type CreateMatchMutationResult = Apollo.MutationResult<CreateMatchMutation>;
export type CreateMatchMutationOptions = Apollo.BaseMutationOptions<CreateMatchMutation, CreateMatchMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    displayName
    team {
      id
      name
      code
      sport
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
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
export function useValidateTeamCodeQuery(baseOptions: Apollo.QueryHookOptions<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables> & ({ variables: ValidateTeamCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>(ValidateTeamCodeDocument, options);
      }
export function useValidateTeamCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>(ValidateTeamCodeDocument, options);
        }
export function useValidateTeamCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>(ValidateTeamCodeDocument, options);
        }
export type ValidateTeamCodeQueryHookResult = ReturnType<typeof useValidateTeamCodeQuery>;
export type ValidateTeamCodeLazyQueryHookResult = ReturnType<typeof useValidateTeamCodeLazyQuery>;
export type ValidateTeamCodeSuspenseQueryHookResult = ReturnType<typeof useValidateTeamCodeSuspenseQuery>;
export type ValidateTeamCodeQueryResult = Apollo.QueryResult<ValidateTeamCodeQuery, ValidateTeamCodeQueryVariables>;
export const GetTeamMembersDocument = gql`
    query GetTeamMembers {
  getTeamMembers {
    id
    displayName
    email
    createdAt
    updatedAt
    deletedAt
    externalId
    team {
      name
      code
      sport
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
export function useGetTeamMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
      }
export function useGetTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
        }
export function useGetTeamMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
        }
export type GetTeamMembersQueryHookResult = ReturnType<typeof useGetTeamMembersQuery>;
export type GetTeamMembersLazyQueryHookResult = ReturnType<typeof useGetTeamMembersLazyQuery>;
export type GetTeamMembersSuspenseQueryHookResult = ReturnType<typeof useGetTeamMembersSuspenseQuery>;
export type GetTeamMembersQueryResult = Apollo.QueryResult<GetTeamMembersQuery, GetTeamMembersQueryVariables>;