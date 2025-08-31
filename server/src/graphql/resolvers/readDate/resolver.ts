export const ReadDateResolver = {
    books: (readDate, args, { dataloaders }) => dataloaders.readDate.books.load(readDate.bookID),
};
