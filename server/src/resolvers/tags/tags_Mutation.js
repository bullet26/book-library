import { BookTagRelationsModel, BooksModel } from '../../models/index.js';

const linkBookWithTag = async (_, { input }) => {
    try {
        await BookTagRelationsModel.deleteMany({ bookID: input.bookID });

        await Promise.all(input.tagID.map(async item => await BookTagRelationsModel.create({ bookID: input.bookID, tagID: item })));

        const book = await BooksModel.findById(input.bookID);
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const TagsMutation = { linkBookWithTag };
