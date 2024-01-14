import { ReadDateModel } from '../../models/index.js';

const addReadDate = async (_, { input }) => {
    try {
        const book = await ReadDateModel.create({
            bookID: input.bookID,
            readEnd: input.readEnd,
        });
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const ReadDateMutation = { addReadDate };
