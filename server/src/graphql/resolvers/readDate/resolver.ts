import { mergeResolvers } from '@graphql-tools/merge'

import { ReadDateMutation } from './mutation.js'

export const readDateResolvers = mergeResolvers([{ Mutation: ReadDateMutation }])
