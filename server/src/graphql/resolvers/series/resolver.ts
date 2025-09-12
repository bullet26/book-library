import { type SeriesResolvers } from '../../generated/types.js'

export const SeriesResolver: SeriesResolvers = {
  booksInSeries: (series, _, { dataloaders }) => dataloaders.series.booksInSeries.load(series.id),
}
