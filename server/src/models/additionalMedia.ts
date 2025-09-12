import { MediaType } from '../graphql/generated/types.js'
import mongoose from 'mongoose'

const AdditionalMedia = new mongoose.Schema(
  {
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: [...Object.values(MediaType)],
      required: true,
    },
  },
  {
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString()
        ret.bookID = ret.bookID.toString()
        delete ret._id
      },
    },
  },
)

export const AdditionalMediaModel = mongoose.model(
  'AdditionalMediaModel',
  AdditionalMedia,
  'additionalMedia',
)
