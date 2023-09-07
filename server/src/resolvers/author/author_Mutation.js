import { AuthorModel } from '../../models/index.js';

const creteAuthor = async (_, { input }) => {
    try {
        return await AuthorModel.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const AuthorMutation = { creteAuthor };
