import { mergeResolvers } from '@graphql-tools/merge';

import { ReadDateResolver } from './resolver.js';
import { ReadDateMutation } from './mutation.js';
import { ReadDateQuery } from './query.js';

export const readDateResolvers = mergeResolvers([{ Query: ReadDateQuery }, { Mutation: ReadDateMutation }, { ReadDate: ReadDateResolver }]);
