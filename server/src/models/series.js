import mongoose from 'mongoose';

const Series = new mongoose.Schema({
    title: { type: String, required: true },
    authorID: { type: mongoose.Types.ObjectId, ref: 'AuthorModel' },
});

export const SeriesModel = mongoose.model('SeriesModel', Series, 'series');
