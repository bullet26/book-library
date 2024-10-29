import { AdditionalMediaModel, BooksModel } from '../../models/index.js';

const addAdditionalMedia = async (_, { input }) => {
    try {
        const promises = input.map(async item => await AdditionalMediaModel.create(item));
        await Promise.all(promises);

        const book = await BooksModel.findById(input[0].bookID);
        if (!book) {
            throw new Error('Book wasn`t found');
        }

        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const AdditionalMediaMutation = { addAdditionalMedia };
