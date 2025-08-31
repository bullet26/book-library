import { ReadDateModel } from '#models/index.js';

export const ReadDateMutation = {
    addReadDate: async (_, { input }) => {
        try {
            const book = await ReadDateModel.create({
                bookID: input.bookID,
                readEnd: input.readEnd,
            });
            return book;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
