import { mergeResolvers } from '@graphql-tools/merge';

import { BookMutation } from './mutation.js';
import { BookQuery } from './query.js';
import { BookResolver } from './resolver.js';

export const bookResolvers = mergeResolvers([{ Query: BookQuery }, { Mutation: BookMutation }, { Book: BookResolver }]);
