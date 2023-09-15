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

const getAllBooksBySpecificDate = async (_, args) => {
    try {
        const { year } = args;

        const books = await ReadDateModel.find({
            readEnd: {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year + 1}-01-01`),
            },
        }).sort({ readEnd: 1 });
        return books;
    } catch (error) {
        throw new Error('Couldn`t get books');
    }
};

export const ReadDateQuery = { getAllBooksByDate, getAllBooksBySpecificDate };
