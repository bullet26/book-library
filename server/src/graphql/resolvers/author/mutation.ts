import { AuthorModel } from '#models/index.js';

export const AuthorMutation = {
    creteAuthor: async (_, { input }) => {
        try {
            return await AuthorModel.create(input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
