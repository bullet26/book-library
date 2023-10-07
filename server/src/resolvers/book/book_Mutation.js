import { BooksModel, ReadDateModel, DescriptionPlotModel } from '../../models/index.js';

const addBook = async (_, { input }) => {
    try {
        const book = await BooksModel.create(input);
        if (input.hasOwnProperty('readEnd')) {
            await ReadDateModel.create({
                bookID: book._id,
                readEnd: input.readEnd,
            });
        }
        if (input.hasOwnProperty('plot')) {
            await DescriptionPlotModel.create({
                bookID: book._id,
                plot: input.plot,
            });
        }
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const BookMutation = { addBook };
