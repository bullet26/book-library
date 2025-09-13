import mongoose from 'mongoose'

const Authors = new mongoose.Schema(
  {
    name: { required: true, type: String },
    portrait: String,
    portraitThumbnail: String,
    surname: String,
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
