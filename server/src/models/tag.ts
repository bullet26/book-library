import mongoose from 'mongoose'

const Tag = new mongoose.Schema(
  {
    tag: { required: true, type: String },
  },
  {
    toJSON: {
      transform: function (_, ret: any) {
        delete ret._id
        delete ret.__v
        return ret
      },
      virtuals: true,
    },
  },
)

const BookTagRelations = new mongoose.Schema(
  {
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    tagID: { ref: 'TagModel', type: mongoose.Types.ObjectId },
  },
  {
    toJSON: {
      transform: function (_, ret: any) {
        ret.bookID = ret.bookID.toString()
        ret.tagID = ret.tagID.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
      virtuals: true,
    },
  },
)

export const TagModel = mongoose.model('TagModel', Tag, 'tags')

export const BookTagRelationsModel = mongoose.model(
  'BookTagRelationsModel',
  BookTagRelations,
  'BookTagRelations',
)
