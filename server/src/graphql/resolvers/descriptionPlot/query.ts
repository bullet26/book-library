import { DescriptionPlotModel } from '../../../models';

export const DescriptionPlotQuery = {
    getOneBookPlot: async (_, args) => {
        const { bookID } = args;
        try {
            const [book] = await DescriptionPlotModel.find({ bookID });
            return book;
        } catch (error) {
            throw new Error('Couldn`t get book');
        }
    },
};
