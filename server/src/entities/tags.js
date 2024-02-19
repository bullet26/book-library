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
    "Get books by tag"
    getAllBooksByTag(tagID: ID): [Book]
  `;

export const tags = {
    typeTags,
    typeTagsResolvers,
};
