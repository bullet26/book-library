import DataLoader from 'dataloader';
import { AuthorModel, SeriesModel, ReadDateModel } from '../../models/index.js';

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

export const BookResolver = { author, series, readDate };
