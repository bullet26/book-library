import { BookTagRelationsModel, TagModel } from '../../models/index.js';

const linkBookWithTag = async (_, { input }) => {
    try {
        await BookTagRelationsModel.create(input);
        const tags = await TagModel.findById(input.tagID);
        return tags;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const TagsMutation = { linkBookWithTag };
