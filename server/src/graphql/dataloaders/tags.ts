import DataLoader from 'dataloader';
import { BooksModel, BookTagRelationsModel } from '#models/index.js';

export const TagsDL = {
    booksInTag: new DataLoader(async (tagIDs: readonly string[]) => {
        const booksInTagObj = await BookTagRelationsModel.find({ tagID: { $in: tagIDs } });
        const booksInTagIds = booksInTagObj.map(item => item.bookID);
        const books = await BooksModel.find({ _id: { $in: booksInTagIds } }).sort({ title: 1 });
        // !fix TODO: убрать консоли и пофиксить, не работает
        console.log(
            books.map(item => item.id),
            'books'
        );
        console.log(booksInTagObj);
        return tagIDs.map(id => books.filter(book => booksInTagObj.find(item => item.bookID?.toString() === book._id?.toString() && item.tagID?.toString() === id.toString())));
    }),
};
