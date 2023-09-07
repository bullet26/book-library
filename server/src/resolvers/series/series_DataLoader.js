import DataLoader from 'dataloader';
import { BooksModel } from '../../models/index.js';

const booksInSeries = (source, args, context, info) => {
    const { dataloaders } = context;
    let booksinSeriesLoader = dataloaders.get(info.fieldNodes);

    if (!booksinSeriesLoader) {
        booksinSeriesLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async seriesID => {
                    try {
                        const res = await BooksModel.find({ seriesID }).sort({ seriesNumber: 1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${seriesID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, booksinSeriesLoader);

    return booksinSeriesLoader.load(source._id);
};

export const SeriesResolver = { booksInSeries };
