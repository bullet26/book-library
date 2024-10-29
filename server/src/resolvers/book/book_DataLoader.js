import DataLoader from 'dataloader';
import { AuthorModel, SeriesModel, ReadDateModel, TagModel, BookTagRelationsModel, AdditionalMediaModel } from '../../models/index.js';

const author = (source, args, context, info) => {
    const { dataloaders } = context;
    let authorLoader = dataloaders.get(info.fieldNodes);

    if (!authorLoader) {
        authorLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async authorID => {
                    try {
                        const res = await AuthorModel.findById(authorID);
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${authorID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, authorLoader);

    return authorLoader.load(source.authorID);
};

const series = (source, args, context, info) => {
    const { dataloaders } = context;
    let seriesLoader = dataloaders.get(info.fieldNodes);

    if (!seriesLoader && !!source.seriesID) {
        seriesLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async seriesID => {
                    try {
                        const res = await SeriesModel.findById(seriesID);
                        return res;
                    } catch (error) {
                        console.error(`Error loading series with ID ${seriesID}:`, error);
                        return null;
                    }
                })
            );
        });

        dataloaders.set(info.fieldNodes, seriesLoader);

        return seriesLoader.load(source.seriesID);
    }

    return null;
};

const tags = (source, args, context, info) => {
    const { dataloaders } = context;
    let tagsForBookLoader = dataloaders.get(info.fieldNodes);

    if (!tagsForBookLoader) {
        tagsForBookLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async bookID => {
                    try {
                        const tagsForBookObj = await BookTagRelationsModel.find({ bookID });
                        const tagsForBook = tagsForBookObj.map(item => item.tagID);
                        const res = await TagModel.find({ _id: { $in: tagsForBook } }).sort({ tag: 1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading book for tag with ID ${bookID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, tagsForBookLoader);

    return tagsForBookLoader.load(source._id);
};

const readDate = (source, args, context, info) => {
    const { dataloaders } = context;
    let readDateLoader = dataloaders.get(info.fieldNodes);

    if (!readDateLoader) {
        readDateLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async bookID => {
                    try {
                        const res = await ReadDateModel.find({ bookID }).sort({ readEnd: -1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading author with ID ${bookID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, readDateLoader);

    return readDateLoader.load(source._id);
};

const isAdditionalMediaExist = (source, args, context, info) => {
    const { dataloaders } = context;
    let isAdditionalMediaExistLoader = dataloaders.get(info.fieldNodes);

    if (!isAdditionalMediaExistLoader) {
        isAdditionalMediaExistLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async bookID => {
                    try {
                        const res = await AdditionalMediaModel.find({ bookID });
                        return !!res.length;
                    } catch (error) {
                        console.error(`Error loading media with ID ${bookID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, isAdditionalMediaExistLoader);

    return isAdditionalMediaExistLoader.load(source._id);
};

const additionalMedia = (source, args, context, info) => {
    const { dataloaders } = context;
    let additionalMediaLoader = dataloaders.get(info.fieldNodes);

    if (!additionalMediaLoader) {
        additionalMediaLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async bookID => {
                    try {
                        const groupedMedia = await AdditionalMediaModel.aggregate([
                            { $match: { bookID } },
                            {
                                $group: {
                                    _id: '$type', // Группируем по полю type
                                    media: { $push: '$$ROOT' }, // Собираем все документы в массив media
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    type: '$_id',
                                    media: 1,
                                },
                            },
                        ]);

                        const result = {
                            image: groupedMedia.find(item => item.type === 'IMAGE')?.media || [],
                            video: groupedMedia.find(item => item.type === 'VIDEO')?.media || [],
                        };

                        return result;
                    } catch (error) {
                        console.error(`Error loading book for tag with ID ${bookID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, additionalMediaLoader);

    return additionalMediaLoader.load(source._id);
};

export const BookResolver = { author, series, tags, readDate, additionalMedia, isAdditionalMediaExist };
