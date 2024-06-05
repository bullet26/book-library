const typeTags = `
  "Tag data"
  type Tags {
    _id: ID
    tag: String!
    booksInTag(sortBy: String): [Book]
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
    getTagById(id: ID, sortBy: String = "title"): Tags
    "Get all tags"
    getAllTags: [Tags]
  `;

const typeTagsMutation = `
  "link Book with Tag"
  linkBookWithTag(input: BookTagRelationsInput): Book
  `;

export const tags = {
    typeTags,
    typeTagsResolvers,
    typeTagsMutation,
};
