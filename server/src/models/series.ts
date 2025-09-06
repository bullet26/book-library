import mongoose from 'mongoose'

const Series = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authorID: { type: mongoose.Types.ObjectId, ref: 'AuthorModel' },
  },
  {
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString()
        ret.authorID = ret.authorID.toString()
        delete ret._id
      },
    },
  },
)

export const SeriesModel = mongoose.model('SeriesModel', Series, 'series')
