import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly stravaAccessToken?: string | null;
  readonly stravaRefreshToken?: string | null;
  readonly Events?: (Event | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly stravaAccessToken?: string | null;
  readonly stravaRefreshToken?: string | null;
  readonly Events: AsyncCollection<Event>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
  };
  readonly id: string;
  readonly type: string;
  readonly eventJSON: string;
  readonly date: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userID: string;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
  };
  readonly id: string;
  readonly type: string;
  readonly eventJSON: string;
  readonly date: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userID: string;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}