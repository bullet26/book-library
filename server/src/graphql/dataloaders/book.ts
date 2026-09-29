import DataLoader from 'dataloader'
import mongoose from 'mongoose'

import {
  AdditionalMediaModel,
  AuthorModel,
  BookTagRelationsModel,
  ReadDateModel,
  SeriesModel,
  TagModel,
} from '../../models/index.js'
import { mapOneToMany, mapOneToOne, toObjectMapping } from '../../utils/mappers.js'
import { Author, BookTagRelations, MediaType, ReadDate, Series, Tags } from '../generated/types.js'

export const BookDL = {
  additionalMedia: new DataLoader(async (bookIDs: readonly string[]) => {
    const ids = bookIDs.map((id) => new mongoose.Types.ObjectId(id))

    const groupedMedia = await AdditionalMediaModel.aggregate([
      { $match: { bookID: { $in: ids } } },
      {
        $group: {
          _id: { bookID: '$bookID', type: '$type' }, // Группируем по полю type
          media: { $push: '$$ROOT' }, // Собираем все документы в массив media
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          media: {
            $map: {
              as: 'm',
              in: {
                bookID: '$$m.bookID',
                id: '$$m._id',
                type: '$$m.type',
                url: '$$m.url',
              },
              input: '$media',
            },
          },
        },
      },
    ])

    return bookIDs.map((id) => {
      const mediaForBook = groupedMedia.filter((item) => item.id.bookID.toString() === id)

      return {
        image: mediaForBook.find((item) => item.id.type === MediaType.Image)?.media ?? [],
        video: mediaForBook.find((item) => item.id.type === MediaType.Video)?.media ?? [],
      }
    })
  }),

  author: new DataLoader(async (authorIDs: readonly string[]) => {
    const authorsDocs = await AuthorModel.find({ _id: { $in: authorIDs } })
    const authors = toObjectMapping<Author>(authorsDocs)
    return mapOneToOne(authors, authorIDs)
  }),

  isAdditionalMediaExist: new DataLoader(async (bookIDs: readonly string[]) => {
    const media = await AdditionalMediaModel.find({ bookID: { $in: bookIDs } }).distinct('bookID')
    const mediaSet = new Set(media.map((id) => id.toString()))
    return bookIDs.map((id) => mediaSet.has(id))
  }),

  readDate: new DataLoader(async (bookIDs: readonly string[]) => {
    const readDatesDocs = await ReadDateModel.find({ bookID: { $in: bookIDs } }).sort({
      readEnd: -1,
    })
    const readDates = toObjectMapping<ReadDate>(readDatesDocs)
    return mapOneToMany(readDates, bookIDs, (item) => item.bookID.toString())
  }),

  series: new DataLoader(async (seriesIDs: readonly string[]) => {
    const seriesDocs = await SeriesModel.find({ _id: { $in: seriesIDs } })
    const series = toObjectMapping<Series>(seriesDocs)
    return mapOneToOne(series, seriesIDs)
  }),

  tags: new DataLoader(async (bookIDs: readonly string[]) => {
    const tagsForBookObjDocs = await BookTagRelationsModel.find({ bookID: { $in: bookIDs } })
    const tagsForBookObj = toObjectMapping<BookTagRelations>(tagsForBookObjDocs)
    const tagsForBookIds = tagsForBookObj.map((item) => item.tagID)
    const tagsDocs = await TagModel.find({ _id: { $in: tagsForBookIds } }).sort({ tag: 1 })
    const tags = toObjectMapping<Tags>(tagsDocs)

    const tagMap = new Map(tags.map((tag) => [tag.id, tag]))

    const bookToTagsMap = new Map<string, Tags[]>()

    for (const relation of tagsForBookObj) {
      const tag = tagMap.get(relation.tagID)
      if (!tag) continue

      const bookIdStr = relation.bookID.toString()
      if (!bookToTagsMap.has(bookIdStr)) {
        bookToTagsMap.set(bookIdStr, [])
      }
      bookToTagsMap.get(bookIdStr)!.push(tag)
    }

    return bookIDs.map((id) => bookToTagsMap.get(id) || [])
  }),
}
