import mongoose from 'mongoose'

const Authors = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: String,
    portrait: String,
    portraitThumbnail: String,
    transcriptionName: String,
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

export const AuthorModel = mongoose.model('AuthorModel', Authors, 'authors')
