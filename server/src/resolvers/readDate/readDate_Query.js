import { ReadDateModel } from '../../models/index.js';

const getAllBooksByDate = async (_, args) => {
    const { page, limit } = args;

    try {
        const totalCount = await ReadDateModel.countDocuments({});
        const books = await ReadDateModel.find({})
            .sort({ readEnd: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return { totalCount, readDate: books };
    } catch (error) {
        throw new Error('Couldn`t get books');
    }
};

export const ReadDateQuery = { getAllBooksByDate };
