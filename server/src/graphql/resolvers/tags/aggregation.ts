import { PipelineStage } from 'mongoose';

export const authorsAggregation = (booksInTagIds: string[]): PipelineStage[] => [
    {
        $match: { _id: { $in: booksInTagIds } },
    },
    {
        $lookup: {
            from: 'authors',
            localField: 'authorID',
            foreignField: '_id',
            as: 'authorData',
        },
    },
    { $unwind: '$authorData' },
    { $addFields: { authorSurname: '$authorData.surname' } },
    {
        $sort: { authorSurname: 1, title: 1 },
    },
    { $project: { authorSurname: 0, authorData: 0 } },
];
