import mongoose from 'mongoose'

const DescriptionPlot = new mongoose.Schema(
  {
    bookID: { ref: 'BooksModel', type: mongoose.Types.ObjectId },
    plot: String,
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

export const DescriptionPlotModel = mongoose.model(
  'DescriptionPlotModel',
  DescriptionPlot,
  'descriptionPlot',
)
