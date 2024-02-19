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
  }`;

const typeTagsResolvers = `
    "Get tag info by id"
    getTagById(id: ID): Tags
  `;

export const tags = {
    typeTags,
    typeTagsResolvers,
};
