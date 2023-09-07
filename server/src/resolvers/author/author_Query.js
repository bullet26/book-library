import { AuthorModel } from '../../models/index.js';

const getAllAuthors = async (_, args) => {
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
};

const getOneAuthor = async (_, args) => {
    const { id } = args;
    try {
        const author = await AuthorModel.findById(id);
        return author;
    } catch (error) {
        throw new Error('Couldn`t get author');
    }
};

export const AuthorQuery = { getAllAuthors, getOneAuthor };
