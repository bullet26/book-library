import DataLoader from 'dataloader';
import { BooksModel, SeriesModel } from '#models/index.js';

export const AuthorDL = {
    books: new DataLoader(async (authorIDs: readonly string[]) => {
        const books = await BooksModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 });
        return authorIDs.map(id => books.filter(item => item.authorID?.toString() === id.toString()));
    }),

    series: new DataLoader(async (authorIDs: readonly string[]) => {
        const series = await SeriesModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 });
        return authorIDs.map(id => series.filter(item => item.authorID?.toString() === id.toString()));
    }),

    booksWithoutSeries: new DataLoader(async (authorIDs: readonly string[]) => {
        const books = await BooksModel.find({ $and: [{ authorID: { $in: authorIDs } }, { seriesID: null }] }).sort({ title: 1 });
        return authorIDs.map(id => books.filter(item => item.authorID?.toString() === id.toString()));
    }),
};
