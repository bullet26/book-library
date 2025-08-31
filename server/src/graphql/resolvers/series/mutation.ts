import { SeriesModel } from '#models/index.js';

export const SeriesMutation = {
    creteSerie: async (_, { input }) => {
        try {
            return await SeriesModel.create(input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
