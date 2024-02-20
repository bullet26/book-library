const typeTags = `
  "Tag data"
  type Tags {
    _id: ID
    tag: String!
    booksInTag: [Book]
  }
  "BookTagRelations data"
  type BookTagRelations {
    _id: ID
    bookID: ID!
    tagID: ID!
  }
  "data for link Book with Tag"
  input BookTagRelationsInput {
    bookID: ID!
    tagID: [ID!]
  }
  `;

const typeTagsResolvers = `
    "Get tag info by id"
    getTagById(id: ID): Tags
    "Get all tags"
    getAllTags: [Tags]
  `;

const typeTagsMutation = `
  "link Book with Tag"
  linkBookWithTag(input: BookTagRelationsInput): Tags
  `;

export const tags = {
    typeTags,
    typeTagsResolvers,
    typeTagsMutation,
};
