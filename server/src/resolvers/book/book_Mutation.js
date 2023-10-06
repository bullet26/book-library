import { BooksModel, ReadDateModel } from '../../models/index.js';

const addBook = async (_, { input }) => {
    try {
        const book = await BooksModel.create(input);
        if (input.hasOwnProperty('readEnd')) {
            await ReadDateModel.create({
                bookID: book._id,
                readEnd: input.readEnd,
            });
        }
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const BookMutation = { addBook };
