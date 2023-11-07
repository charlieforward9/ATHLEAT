// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Event, User } = initSchema(schema);

export {
  Event,
  User
};