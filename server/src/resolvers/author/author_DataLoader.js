import DataLoader from 'dataloader';
import { BooksModel, SeriesModel } from '../../models/index.js';

const books = (source, args, context, info) => {
    const { dataloaders } = context;
    let booksLoader = dataloaders.get(info.fieldNodes);

    if (!booksLoader) {
        booksLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async authorID => {
                    try {
                        const res = await BooksModel.find({ authorID }).sort({ title: 1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${authorID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, booksLoader);

    return booksLoader.load(source._id);
};

const series = (source, args, context, info) => {
    const { dataloaders } = context;
    let seriesLoader = dataloaders.get(info.fieldNodes);

    if (!seriesLoader) {
        seriesLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async authorID => {
                    try {
                        const res = await SeriesModel.find({ authorID }).sort({ title: 1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${authorID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, seriesLoader);

    return seriesLoader.load(source._id);
};

const booksWithoutSeries = (source, args, context, info) => {
    const { dataloaders } = context;
    let booksWithoutSeriesLoader = dataloaders.get(info.fieldNodes);

    if (!booksWithoutSeriesLoader) {
        booksWithoutSeriesLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async authorID => {
                    try {
                        const findValue = { $and: [{ authorID }, { seriesID: null }] };
                        const res = await BooksModel.find(findValue);
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${authorID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, booksWithoutSeriesLoader);

    return booksWithoutSeriesLoader.load(source._id);
};

export const AuthorResolver = { books, series, booksWithoutSeries };
