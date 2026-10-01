import { PipelineStage } from 'mongoose'

export const getAuthorsByBooksCountPipeline = (page = 1, limit = 50): PipelineStage[] => {
  const skip = (page - 1) * limit

  return [
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
      $facet: {
        authors: [
          { $sort: { count: -1 } },
          { $skip: skip },
          { $limit: limit },
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
          { $unwind: '$authorData' },
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
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
  ]
}
