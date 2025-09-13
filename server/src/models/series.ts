import mongoose from 'mongoose'

const Series = new mongoose.Schema(
  {
    authorID: { ref: 'AuthorModel', type: mongoose.Types.ObjectId },
    title: { required: true, type: String },
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
