import mongoose from 'mongoose'

const Books = new mongoose.Schema(
  {
    authorID: { type: mongoose.Types.ObjectId, ref: 'AuthorModel' },
    title: { type: String, required: true },
    rating: Number,
    seriesID: { type: mongoose.Types.ObjectId, default: null, ref: 'SeriesModel' },
    seriesNumber: Number,
    pages: Number,
    notes: String,
    description: String,
    bookCover: String,
    bookCoverThumbnail: String,
  },
  {
    toObject: {
      transform: function (_, ret: any) {
        ret.id = ret._id.toString()
        ret.authorID = ret.authorID.toString()
        ret.seriesID = ret.seriesID?.toString() || null
        delete ret._id
      },
    },
  },
)

export const BooksModel = mongoose.model('BooksModel', Books, 'books')
