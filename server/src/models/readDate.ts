import mongoose from 'mongoose'

const ReadDate = new mongoose.Schema(
  {
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    readEnd: Date,
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

export const ReadDateModel = mongoose.model('ReadDateModel', ReadDate, 'readDate')
