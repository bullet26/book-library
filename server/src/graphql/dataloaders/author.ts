import DataLoader from 'dataloader';
import { BooksModel, SeriesModel } from '../../models';

export const AuthorDL = {
    books: new DataLoader(async (authorIDs: readonly string[]) => {
        const books = await BooksModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 });
        return authorIDs.map(id => books.find(item => item?.authorID?.toString() === id));
    }),

    series: new DataLoader(async (authorIDs: readonly string[]) => {
        const series = await SeriesModel.find({ authorID: { $in: authorIDs } }).sort({ title: 1 });
        return authorIDs.map(id => series.find(item => item?.authorID?.toString() === id));
    }),

    booksWithoutSeries: new DataLoader(async (authorIDs: readonly string[]) => {
        const series = await BooksModel.find({ $and: [{ authorID: { $in: authorIDs } }, { seriesID: null }] }).sort({ title: 1 });
        return authorIDs.map(id => series.find(item => item?.authorID?.toString() === id));
    }),
};
