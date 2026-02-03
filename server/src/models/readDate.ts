import mongoose from 'mongoose'

const ReadDate = new mongoose.Schema(
  {
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    readEnd: Date,
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

export const ReadDateModel = mongoose.model('ReadDateModel', ReadDate, 'readDate')
