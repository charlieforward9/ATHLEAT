/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  stravaAccessToken?: string | null,
  stravaRefreshToken?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  stravaAccessToken?: ModelStringInput | null,
  stravaRefreshToken?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email: string,
  stravaAccessToken?: string | null,
  stravaRefreshToken?: string | null,
  Events?: ModelEventConnection | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  owner?: string | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type Event = {
  __typename: "Event",
  id: string,
  type: string,
  eventJSON: string,
  date: string,
  time: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  userID: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  stravaAccessToken?: string | null,
  stravaRefreshToken?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateEventInput = {
  id?: string | null,
  type: string,
  eventJSON: string,
  date: string,
  time: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  userID: string,
};

export type ModelEventConditionInput = {
  type?: ModelStringInput | null,
  eventJSON?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateEventInput = {
  id: string,
  type?: string | null,
  eventJSON?: string | null,
  date?: string | null,
  time?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userID?: string | null,
};

export type DeleteEventInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  stravaAccessToken?: ModelStringInput | null,
  stravaRefreshToken?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  eventJSON?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  stravaAccessToken?: ModelSubscriptionStringInput | null,
  stravaRefreshToken?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  eventJSON?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  time?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionEventFilterInput | null > | null,
  or?: Array< ModelSubscriptionEventFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      stravaAccessToken?: string | null,
      stravaRefreshToken?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      type: string,
      eventJSON: string,
      date: string,
      time: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      userID: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EventsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EventsByUserIDQuery = {
  eventsByUserID?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      type: string,
      eventJSON: string,
      date: string,
      time: string,
      createdAt?: string | null,
      updatedAt?: string | null,
      userID: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    stravaAccessToken?: string | null,
    stravaRefreshToken?: string | null,
    Events?:  {
      __typename: "ModelEventConnection",
      nextToken?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    type: string,
    eventJSON: string,
    date: string,
    time: string,
    createdAt?: string | null,
    updatedAt?: string | null,
    userID: string,
    owner?: string | null,
  } | null,
};
