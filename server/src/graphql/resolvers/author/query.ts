import { AuthorModel, BooksModel } from '#models/index.js';
import { authorsAggregation } from './aggregation.js';

export const AuthorQuery = {
    getAllAuthors: async (_, args) => {
        const { page, limit } = args;

        try {
            const totalCount = await AuthorModel.countDocuments({});
            const authors = await AuthorModel.find({})
                .sort({ surname: 1 })
                .skip((page - 1) * limit)
                .limit(limit);

            return { authors, totalCount };
        } catch (error) {
            throw new Error('Couldn`t get authors');
        }
    },

    getAllAuthorsByBooksCount: async () => {
        try {
            const authors = await BooksModel.aggregate(authorsAggregation);
            return authors;
        } catch (error) {
            throw new Error('Couldn`t find info in DB');
        }
    },

    getOneAuthor: async (_, args) => {
        const { id } = args;
        try {
            const author = await AuthorModel.findById(id);
            return author;
        } catch (error) {
            throw new Error('Couldn`t get author');
        }
    },
};
