import { AuthorModel, BooksModel } from '../../models/index.js';

const search = async (_, args) => {
    const { searchString } = args;
    const regexp = new RegExp(searchString, 'i');

    try {
        const books = await BooksModel.find({ title: regexp }).limit(15);
        const authors = await AuthorModel.find({ $or: [{ surname: regexp }, { name: regexp }, { transcriptionName: regexp }] }).limit(15);

        return [...books, ...authors];
    } catch (error) {
        throw new Error('Couldn`t find author or book');
    }
};

export const SearchQuery = { search };
