import mongoose from 'mongoose';

const ReadDate = new mongoose.Schema({
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    readEnd: Date,
});

export const ReadDateModel = mongoose.model('ReadDateModel', ReadDate, 'readDate');
