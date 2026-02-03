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

export const AuthorModel = mongoose.model('AuthorModel', Authors, 'authors')
