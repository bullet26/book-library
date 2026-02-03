import mongoose from 'mongoose'

const Series = new mongoose.Schema(
  {
    authorID: { ref: 'AuthorModel', type: mongoose.Types.ObjectId },
    title: { required: true, type: String },
  },
  {
    toJSON: {
      transform: function (_, ret: any) {
        ret.authorID = ret.authorID.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
      virtuals: true,
    },
  },
)

export const SeriesModel = mongoose.model('SeriesModel', Series, 'series')
