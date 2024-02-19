import mongoose from 'mongoose';

const Tag = new mongoose.Schema({
    tag: { type: String, required: true },
});

const BookTagRelations = new mongoose.Schema({
    bookID: { type: mongoose.Types.ObjectId, ref: 'BooksModel' },
    tagID: { type: mongoose.Types.ObjectId, ref: 'TagModel' },
});

export const TagModel = mongoose.model('TagModel', Tag, 'tags');

export const BookTagRelationsModel = mongoose.model('BookTagRelationsModel', BookTagRelations, 'BookTagRelations');
