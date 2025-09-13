import mongoose from 'mongoose'

const Tag = new mongoose.Schema(
  {
    tag: { required: true, type: String },
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
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    tagID: { ref: 'TagModel', type: mongoose.Types.ObjectId },
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
