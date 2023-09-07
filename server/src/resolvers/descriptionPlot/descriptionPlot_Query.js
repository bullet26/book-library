import { DescriptionPlotModel } from '../../models/index.js';

const getOneBookPlot = async (_, args) => {
    const { bookID } = args;
    try {
        const [book] = await DescriptionPlotModel.find({ bookID });
        return book;
    } catch (error) {
        throw new Error('Couldn`t get book');
    }
};

export const DescriptionPlotQuery = { getOneBookPlot };
