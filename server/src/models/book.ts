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
