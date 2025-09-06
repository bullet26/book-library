import mongoose from 'mongoose'

const DescriptionPlot = new mongoose.Schema(
  {
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    plot: String,
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

export const DescriptionPlotModel = mongoose.model(
  'DescriptionPlotModel',
  DescriptionPlot,
  'descriptionPlot',
)
