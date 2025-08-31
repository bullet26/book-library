import DataLoader from 'dataloader';
import { ReadDateModel, TagModel, BookTagRelationsModel, AdditionalMediaModel, AuthorModel, SeriesModel } from '#models/index.js';

export const BookDL = {
    author: new DataLoader(async (authorIDs: readonly string[]) => {
        const authors = await AuthorModel.find({ _id: { $in: authorIDs } });
        return authorIDs.map(id => authors.find(item => item._id.toString() === id));
    }),

    series: new DataLoader(async (seriesIDs: readonly string[]) => {
        const series = await SeriesModel.find({ _id: { $in: seriesIDs } });
        return seriesIDs.map(id => series.find(item => item._id.toString() === id));
    }),

    tags: new DataLoader(async (bookIDs: readonly string[]) => {
        const tagsForBookObj = await BookTagRelationsModel.find({ bookID: { $in: bookIDs } });
        const tagsForBookIds = tagsForBookObj.map(item => item.tagID);
        const tags = await TagModel.find({ _id: { $in: tagsForBookIds } }).sort({ tag: 1 });
        return bookIDs.map(id => tags.filter(tag => tagsForBookObj.some(item => item?.bookID?.toString() === id && item?.tagID?.toString() === tag._id.toString())));
    }),

    readDate: new DataLoader(async (bookIDs: readonly string[]) => {
        const readDates = await ReadDateModel.find({ bookID: { $in: bookIDs } }).sort({ readEnd: -1 });
        return bookIDs.map(id => readDates.find(item => item?.bookID?.toString() === id));
    }),

    isAdditionalMediaExist: new DataLoader(async (bookIDs: readonly string[]) => {
        const media = await AdditionalMediaModel.find({ bookID: { $in: bookIDs } }).distinct('bookID');
        return bookIDs.map(id => media.filter(item => item?.toString() === id).length > 0);
    }),

    additionalMedia: new DataLoader(async (bookIDs: readonly string[]) => {
        const groupedMedia = await AdditionalMediaModel.aggregate([
            { $match: { bookID: { $in: bookIDs } } },
            {
                $group: {
                    _id: { bookID: '$bookID', type: '$type' }, // Группируем по полю type
                    media: { $push: '$$ROOT' }, // Собираем все документы в массив media
                },
            },
        ]);

        return bookIDs.map(id => {
            const mediaForBook = groupedMedia.filter(item => item._id.bookID.toString() === id);
            return {
                image: mediaForBook.find(item => item._id.type === 'IMAGE')?.media || [],
                video: mediaForBook.find(item => item._id.type === 'VIDEO')?.media || [],
            };
        });
    }),
};
