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
