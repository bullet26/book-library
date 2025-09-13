import { PipelineStage } from 'mongoose';

export const authorsAggregation: PipelineStage[] = [
    {
        $group: {
            _id: '$authorID',
            count: { $sum: 1 },
        },
    },
    {
        $match: {
            count: { $gte: 2 },
        },
    },
    {
        $sort: { count: -1 },
    },
    {
        $addFields: {
            authorSearchID: '$_id',
        },
    },
    {
        $lookup: {
            as: 'authorData',
            foreignField: '_id',
            from: 'authors',
            localField: 'authorSearchID',
        },
    },
    {
        $unwind: '$authorData',
    },
    {
        $addFields: {
            id: '$authorData._id',
            name: '$authorData.name',
            portraitThumbnail: '$authorData.portraitThumbnail',
            surname: '$authorData.surname',
        },
    },
    {
        $project: {
            _id: 0,
            authorData: 0,
            authorSearchID: 0,
        },
    },
];
