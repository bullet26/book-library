import mongoose from 'mongoose';

const DescriptionPlot = new mongoose.Schema({
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    plot: String,
});

export const DescriptionPlotModel = mongoose.model('DescriptionPlotModel', DescriptionPlot, 'descriptionPlot');
