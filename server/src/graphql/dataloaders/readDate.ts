import DataLoader from 'dataloader';
import { BooksModel } from '../../models/index.js';

export const ReadDateDL = {
    books: new DataLoader(async (bookIDs: readonly string[]) => {
        const books = await BooksModel.find({ _id: { $in: bookIDs } });
        return bookIDs.map(id => books.find(item => item?._id?.toString() === id));
    }),
};
