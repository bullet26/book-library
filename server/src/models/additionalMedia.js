import mongoose from 'mongoose';

const AdditionalMedia = new mongoose.Schema({
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    url: { type: String, required: true },
    type: {
        type: String,
        enum: ['IMAGE', 'VIDEO'],
        required: true,
    },
});

export const AdditionalMediaModel = mongoose.model('AdditionalMediaModel', AdditionalMedia, 'additionalMedia');
