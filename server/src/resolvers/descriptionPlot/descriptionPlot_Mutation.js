import { DescriptionPlotModel } from '../../models/index.js';

const addBookPlot = async (_, { input }) => {
    try {
        return await DescriptionPlotModel.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const DescriptionPlotMutation = { addBookPlot };
