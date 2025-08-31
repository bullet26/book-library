import { DescriptionPlotModel } from '#models/index.js';

export const DescriptionPlotMutation = {
    addBookPlot: async (_, { input }) => {
        try {
            return await DescriptionPlotModel.create(input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
