import DataLoader from 'dataloader'
import {
  ReadDateModel,
  TagModel,
  BookTagRelationsModel,
  AdditionalMediaModel,
  AuthorModel,
  SeriesModel,
} from '#models/index.js'
import { toObjectMapping } from '#utils/mappers.js'
import {
  Author,
  BookTagRelations,
  MediaType,
  ReadDate,
  Series,
  Tags,
} from '#graphql/generated/types.js'

export const BookDL = {
  author: new DataLoader(async (authorIDs: readonly string[]) => {
    const authorsDocs = await AuthorModel.find({ _id: { $in: authorIDs } })
    const authors = toObjectMapping<Author>(authorsDocs)

    return authorIDs.map((id) => authors.find((item) => item.id === id.toString()))
  }),

  series: new DataLoader(async (seriesIDs: readonly string[]) => {
    const seriesDocs = await SeriesModel.find({ _id: { $in: seriesIDs } })
    const series = toObjectMapping<Series>(seriesDocs)

    return seriesIDs.map((id) => series.find((item) => item.id === id.toString()))
  }),

  tags: new DataLoader(async (bookIDs: readonly string[]) => {
    const tagsForBookObjDocs = await BookTagRelationsModel.find({ bookID: { $in: bookIDs } })
    const tagsForBookObj = toObjectMapping<BookTagRelations>(tagsForBookObjDocs)
    const tagsForBookIds = tagsForBookObj.map((item) => item.tagID)
    const tagsDocs = await TagModel.find({ _id: { $in: tagsForBookIds } }).sort({ tag: 1 })
    const tags = toObjectMapping<Tags>(tagsDocs)

    return bookIDs.map((id) =>
      tags.filter((tag) =>
        tagsForBookObj.find((item) => item.bookID === id.toString() && item.tagID === tag.id),
      ),
    )
  }),

  readDate: new DataLoader(async (bookIDs: readonly string[]) => {
    const readDatesDocs = await ReadDateModel.find({ bookID: { $in: bookIDs } }).sort({
      readEnd: -1,
    })
    const readDates = toObjectMapping<ReadDate>(readDatesDocs)

    return bookIDs.map((id) => readDates.filter((item) => item.bookID === id.toString()))
  }),

  isAdditionalMediaExist: new DataLoader(async (bookIDs: readonly string[]) => {
    const media = await AdditionalMediaModel.find({ bookID: { $in: bookIDs } }).distinct('bookID')
    return bookIDs.map((id) => media.some((item) => item?.toString() === id.toString()))
  }),

  additionalMedia: new DataLoader(async (bookIDs: readonly string[]) => {
    const groupedMedia = await AdditionalMediaModel.aggregate([
      { $match: { bookID: { $in: bookIDs } } },
      {
        $group: {
          _id: { bookID: '$bookID', type: '$type' }, // Группируем по полю type
          media: { $push: '$$ROOT' }, // Собираем все документы в массив media
        },
      },
    ])

    console.log(groupedMedia, 'groupedMedia')

    return bookIDs.map((id) => {
      const mediaForBook = groupedMedia.filter(
        (item) => item._id.bookID.toString() === id.toString(),
      )
      return {
        image: mediaForBook.find((item) => item._id.type === MediaType.Image)?.media || [],
        video: mediaForBook.find((item) => item._id.type === MediaType.Video)?.media || [],
      }
    })
  }),
}
