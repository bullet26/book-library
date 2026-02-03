import mongoose from 'mongoose'

import { MediaType } from '../graphql/generated/types.js'

const AdditionalMedia = new mongoose.Schema(
  {
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    type: {
      enum: [...Object.values(MediaType)],
      required: true,
      type: String,
    },
    url: { required: true, type: String },
  },
  {
    toJSON: {
      transform: function (_, ret: any) {
        ret.bookID = ret.bookID.toString()

        delete ret._id
        delete ret.__v

        return ret
      },
      virtuals: true,
    },
  },
)

export const AdditionalMediaModel = mongoose.model(
  'AdditionalMediaModel',
  AdditionalMedia,
  'additionalMedia',
)
