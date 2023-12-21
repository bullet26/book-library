import mongoose from 'mongoose';

const Books = new mongoose.Schema({
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
});

export const BooksModel = mongoose.model('BooksModel', Books, 'books');
