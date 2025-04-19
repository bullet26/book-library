import { SeriesModel } from '../../models/index.js';

const creteSerie = async (_, { input }) => {
    try {
        return await SeriesModel.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const SeriesMutation = { creteSerie };
