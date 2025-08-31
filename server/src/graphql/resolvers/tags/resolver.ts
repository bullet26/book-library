import { BooksModel } from '#models/index.js';
import { authorsAggregation } from './aggregation.js';

export const TagsResolver = {
    booksInTag: async (tags, args, { dataloaders }) => {
        const booksInTagIds = await dataloaders.tags.booksInTag.load(tags._id);

        const { sortBy } = args;

        if (sortBy === 'title') {
            const books = await BooksModel.find({ _id: { $in: booksInTagIds } }).sort({ title: 1 });
            return books;
        }
        if (sortBy === 'author') {
            const books = await BooksModel.aggregate(authorsAggregation(booksInTagIds));

            return books;
        }
    },
};
