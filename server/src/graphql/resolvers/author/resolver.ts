export const AuthorResolver = {
    books: (author, args, { dataloaders }) => dataloaders.author.books.load(author._id),
    series: (author, args, { dataloaders }) => dataloaders.author.series.load(author._id),
    booksWithoutSeries: (author, args, { dataloaders }) => dataloaders.author.booksWithoutSeries.load(author._id),
};
