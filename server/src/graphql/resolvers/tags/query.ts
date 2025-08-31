import { TagModel } from '../../../models';

export const TagsQuery = {
    getTagById: async (_, args) => {
        try {
            const { id, sortBy } = args;
            const tag = await TagModel.findById(id);
            return { ...tag.toObject(), sortBy };
        } catch (error: any) {
            throw new Error(`Couldn't get tag info with ID ${args.id}:`, error.message);
        }
    },

    getAllTags: async () => {
        try {
            const tags = await TagModel.find({}).sort({ tag: 1 });
            return tags;
        } catch (error: any) {
            throw new Error('Couldn`t get tags', error.message);
        }
    },
};
