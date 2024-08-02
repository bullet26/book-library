export const authorsAggregation = [
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
            from: 'authors',
            localField: 'authorSearchID',
            foreignField: '_id',
            as: 'authorData',
        },
    },
    {
        $unwind: '$authorData',
    },
    {
        $addFields: {
            id: '$authorData._id',
            surname: '$authorData.surname',
            name: '$authorData.name',
            portraitThumbnail: '$authorData.portraitThumbnail',
        },
    },
    {
        $project: {
            _id: 0,
            authorSearchID: 0,
            authorData: 0,
        },
    },
];
