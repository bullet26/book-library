import { mergeResolvers } from '@graphql-tools/merge';
import { BookQuery } from './query';
import { BookMutation } from './mutation';
import { BookResolver } from './resolver';

export const bookResolvers = mergeResolvers([{ Query: BookQuery }, { Mutation: BookMutation }, { Book: BookResolver }]);
