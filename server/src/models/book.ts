import mongoose from 'mongoose'

const Books = new mongoose.Schema(
  {
    authorID: { ref: 'AuthorModel', type: mongoose.Types.ObjectId },
    bookCover: String,
    bookCoverThumbnail: String,
    description: String,
    notes: String,
    pages: Number,
    rating: Number,
    seriesID: { default: null, ref: 'SeriesModel', type: mongoose.Types.ObjectId },
    seriesNumber: Number,
    title: { required: true, type: String },
  },
  {
    toJSON: {
      transform: function (_, ret: any) {
        ret.authorID = ret.authorID.toString()
        ret.seriesID = ret.seriesID?.toString() ?? null
        delete ret._id
        delete ret.__v
        return ret
      },
      virtuals: true,
    },
  },
)

export const BooksModel = mongoose.model('BooksModel', Books, 'books')
