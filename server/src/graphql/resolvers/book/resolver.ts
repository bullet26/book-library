export const BookResolver = {
    author: (book, args, { dataloaders }) => dataloaders.book.author.load(book.authorID),
    series: (book, args, { dataloaders }) => (book.seriesID ? dataloaders.book.series.load(book.seriesID) : null),
    tags: (book, args, { dataloaders }) => dataloaders.book.tags.load(book._id),
    readDate: (book, args, { dataloaders }) => dataloaders.book.readDate.load(book._id),
    isAdditionalMediaExist: (book, args, { dataloaders }) => dataloaders.book.isAdditionalMediaExist.load(book._id),
    additionalMedia: (book, args, { dataloaders }) => dataloaders.book.additionalMedia.load(book._id),
};
