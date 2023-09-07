import { BooksModel } from '../../models/index.js';

const getAllBooksByName = async (_, args) => {
    const { page, limit } = args;

    try {
        const totalCount = await BooksModel.countDocuments({});
        const books = await BooksModel.find({})
            .sort({ title: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return { totalCount, books };
    } catch (error) {
        throw new Error('Couldn`t get books');
    }
};

const getOneBook = async (_, args) => {
    const { id } = args;
    try {
        const book = await BooksModel.findById(id);
        return book;
    } catch (error) {
        throw new Error('Couldn`t get book');
    }
};

export const BookQuery = { getAllBooksByName, getOneBook };
