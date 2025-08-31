export const SeriesResolver = {
    booksInSeries: (series, args, { dataloaders }) => dataloaders.series.booksInSeries.load(series._id),
};
