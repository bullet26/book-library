import { AuthorModel, BooksModel, SeriesModel } from '../../models/index.js';

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

const searchInAuthors = async (_, args) => {
    const { searchString } = args;
    const regexp = new RegExp(searchString, 'i');

    try {
        const authors = await AuthorModel.find({ $or: [{ surname: regexp }, { name: regexp }, { transcriptionName: regexp }] }).limit(15);
        return authors;
    } catch (error) {
        throw new Error('Couldn`t find authors');
    }
};

const searchInSeries = async (_, args) => {
    const { searchString } = args;
    const regexp = new RegExp(searchString, 'i');

    try {
        const series = await SeriesModel.find({ title: regexp }).limit(15);
        return series;
    } catch (error) {
        throw new Error('Couldn`t find series');
    }
};

const searchInBooks = async (_, args) => {
    const { searchString } = args;
    const regexp = new RegExp(searchString, 'i');

    try {
        const books = await BooksModel.find({ title: regexp }).limit(15);
        return books;
    } catch (error) {
        throw new Error('Couldn`t find books');
    }
};

export const SearchQuery = { search, searchInAuthors, searchInSeries, searchInBooks };
