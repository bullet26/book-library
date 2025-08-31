import mongoose from 'mongoose';

const Authors = new mongoose.Schema({
    name: { type: String, required: true },
    surname: String,
    portrait: String,
    portraitThumbnail: String,
    transcriptionName: String,
});

export const AuthorModel = mongoose.model('AuthorModel', Authors, 'authors');
