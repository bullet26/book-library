import { TagModel } from '../../models/index.js';

const getTagById = async (_, args) => {
    try {
        const { id } = args;
        const tag = await TagModel.findById(id);
        return tag;
    } catch (error) {
        throw new Error(`Couldn't get tag info with ID ${tagID}:`, error);
    }
};

const getAllTags = async () => {
    try {
        const tags = await TagModel.find({}).sort({ tag: 1 });
        return tags;
    } catch (error) {
        throw new Error('Couldn`t get tags', error);
    }
};

export const TagsQuery = { getTagById, getAllTags };
