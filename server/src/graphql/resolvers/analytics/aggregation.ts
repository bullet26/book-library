import { PipelineStage } from 'mongoose'

export const booksAggregation: PipelineStage[] = [
  {
    $group: {
      _id: '$bookID',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $match: { count: { $gte: 2 } },
  },
  {
    $addFields: {
      bookSearchID: '$_id',
      count: '$count',
    },
  },
  {
    $lookup: {
      from: 'books',
      localField: 'bookSearchID',
      foreignField: '_id',
      as: 'bookData',
    },
  },
  {
    $unwind: '$bookData',
  },
  {
    $addFields: {
      bookTitle: '$bookData.title',
      authorID: '$bookData.authorID',
    },
  },
  {
    $lookup: {
      from: 'authors',
      localField: 'authorID',
      foreignField: '_id',
      as: 'authorData',
    },
  },
  {
    $unwind: '$authorData',
  },
  {
    $addFields: {
      author: '$authorData.surname',
    },
  },
  {
    $project: {
      _id: 0,
      bookSearchID: 0,
      authorID: 0,
      bookData: 0,
      authorData: 0,
    },
  },
]

export const authorsAggregation: PipelineStage[] = [
  {
    $group: {
      _id: '$authorID',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 10,
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
      surname: '$authorData.surname',
      name: '$authorData.name',
    },
  },
  {
    $project: {
      _id: 0,
      authorSearchID: 0,
      authorData: 0,
    },
  },
]

export const yearsStatisticAggregate: PipelineStage[] = [
  {
    $project: {
      year: { $year: '$readEnd' },
    },
  },
  {
    $group: {
      _id: '$year',
      count: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
  {
    $project: {
      _id: 0,
      period: '$_id',
      count: '$count',
    },
  },
]

export const yearsAggregate = (year: number): PipelineStage[] => [
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
]
