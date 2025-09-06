import mongoose from 'mongoose'

const Tag = new mongoose.Schema(
  {
    tag: { type: String, required: true },
  },
  {
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
      },
    },
  },
)

const BookTagRelations = new mongoose.Schema(
  {
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    tagID: { type: mongoose.Types.ObjectId, ref: 'TagModel' },
  },
  {
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString()
        ret.bookID = ret.bookID.toString()
        ret.tagID = ret.tagID.toString()
        delete ret._id
      },
    },
  },
)

export const TagModel = mongoose.model('TagModel', Tag, 'tags')

export const BookTagRelationsModel = mongoose.model(
  'BookTagRelationsModel',
  BookTagRelations,
  'BookTagRelations',
)
