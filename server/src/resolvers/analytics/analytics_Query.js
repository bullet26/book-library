import { BooksModel, ReadDateModel } from '../../models/index.js';
import { booksAggregation, authorsAggregation, yearsAggregate } from './aggregation.js';

const getMostReadedBooks = async () => {
    try {
        const books = await ReadDateModel.aggregate(booksAggregation);
        return books;
    } catch (error) {
        throw new Error('Couldn`t find info in DB');
    }
};

const getMostReadedAuthors = async () => {
    try {
        const authors = await BooksModel.aggregate(authorsAggregation);
        return authors;
    } catch (error) {
        throw new Error('Couldn`t find info in DB');
    }
};

const getReadStatistic = async (_, args) => {
    const { label, year } = args;

    try {
        if (label === 'all') {
            const books = await ReadDateModel.aggregate(yearsAggregate);
            return books;
        }
        if (label === 'year' && !!year) {
            const books = await ReadDateModel.aggregate([
                {
                    $match: {
                        readEnd: {
                            $gte: new Date(`${year}-01-01`),
                            $lt: new Date(`${year + 1}-01-01`),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $month: '$readEnd' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        period: '$_id',
                        count: 1,
                    },
                },
                {
                    $sort: { period: 1 },
                },
            ]);
            return books;
        }
        return null;
    } catch (error) {
        throw new Error('Couldn`t find info in DB');
    }
};

export const AnalyticsQuery = { getMostReadedBooks, getMostReadedAuthors, getReadStatistic };
