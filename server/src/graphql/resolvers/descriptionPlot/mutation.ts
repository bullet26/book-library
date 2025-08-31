import { DescriptionPlotModel } from '../../../models';

export const DescriptionPlotMutation = {
    addBookPlot: async (_, { input }) => {
        try {
            return await DescriptionPlotModel.create(input);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
