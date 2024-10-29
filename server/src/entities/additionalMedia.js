const typeAdditionalMedia = `
enum MediaType {
    IMAGE
    VIDEO
}

  "additional image, video for books"
  type AdditionalMedia {
    _id: ID
    bookID: ID!
    url: String!
    type: MediaType!
  }

  "data for add media"
  input AdditionalMediaInput {
    bookID: ID! 
    url: String!
    type: MediaType!
}

type AllMediaForItem {
image: [AdditionalMedia]
video: [AdditionalMedia]
}
`;

const typeAdditionalMediaMutation = `
  "Add image, video for book"
  addAdditionalMedia(input: [AdditionalMediaInput]): Book
  `;

export const additionalMedia = {
    typeAdditionalMedia,
    typeAdditionalMediaMutation,
};
