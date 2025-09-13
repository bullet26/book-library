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
      as: 'bookData',
      foreignField: '_id',
      from: 'books',
      localField: 'bookSearchID',
    },
  },
  {
    $unwind: '$bookData',
  },
  {
    $addFields: {
      authorID: '$bookData.authorID',
      bookTitle: '$bookData.title',
    },
  },
  {
    $lookup: {
      as: 'authorData',
      foreignField: '_id',
      from: 'authors',
      localField: 'authorID',
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
      authorData: 0,
      authorID: 0,
      bookData: 0,
      bookSearchID: 0,
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
      name: '$authorData.name',
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
      count: '$count',
      period: '$_id',
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
      count: 1,
      period: '$_id',
    },
  },
  {
    $sort: { period: 1 },
  },
]
