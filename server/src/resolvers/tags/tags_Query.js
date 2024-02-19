import { BooksModel, BookTagRelationsModel } from '../../models/index.js';

const getAllBooksByTag = async (_, args) => {
    try {
        const { tagID } = args;

        const booksInTagObj = await BookTagRelationsModel.find({ tagID });
        const booksInTag = booksInTagObj.map(item => item.bookID);
        const books = await BooksModel.find({ _id: { $in: booksInTag } }).sort({ title: 1 });
        return books;
    } catch (error) {
        throw new Error(`Couldn't get book in tag with ID ${tagID}:`, error);
    }
};

export const TagsQuery = { getAllBooksByTag };
