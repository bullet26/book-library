import { mergeResolvers } from '@graphql-tools/merge';
import { BookQuery } from './query.js';
import { BookMutation } from './mutation.js';
import { BookResolver } from './resolver.js';

export const bookResolvers = mergeResolvers([{ Query: BookQuery }, { Mutation: BookMutation }, { Book: BookResolver }]);
