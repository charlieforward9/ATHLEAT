import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly typeOfEvent?: string | null;
  readonly eventJSON?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly typeOfEvent?: string | null;
  readonly eventJSON?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly stravaToken?: string | null;
  readonly dateLastUpdated?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly stravaToken?: string | null;
  readonly dateLastUpdated?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}