import { mergeResolvers } from '@graphql-tools/merge';
import { TagsQuery } from './query';
import { TagsMutation } from './mutation';
import { TagsResolver } from './resolver';

export const tagResolvers = mergeResolvers([{ Query: TagsQuery }, { Mutation: TagsMutation }, { Tags: TagsResolver }]);
