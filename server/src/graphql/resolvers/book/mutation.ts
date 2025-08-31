import { BooksModel, ReadDateModel, DescriptionPlotModel } from '#models/index.js';

export const BookMutation = {
    addBook: async (_, { input }) => {
        try {
            const book = await BooksModel.create(input);
            if (input.hasOwnProperty('readEnd') && !!input.readEnd) {
                await ReadDateModel.create({
                    bookID: book._id,
                    readEnd: input.readEnd,
                });
            }
            if (input.hasOwnProperty('plot') && !!input.plot) {
                await DescriptionPlotModel.create({
                    bookID: book._id,
                    plot: input.plot,
                });
            }
            return book;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
