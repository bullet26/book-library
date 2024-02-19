import DataLoader from 'dataloader';
import { BooksModel, BookTagRelationsModel } from '../../models/index.js';

const booksInTag = (source, args, context, info) => {
    const { dataloaders } = context;
    let booksInTagLoader = dataloaders.get(info.fieldNodes);

    if (!booksInTagLoader) {
        booksInTagLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async tagID => {
                    try {
                        const booksInTagObj = await BookTagRelationsModel.find({ tagID });
                        const booksInTag = booksInTagObj.map(item => item.bookID);
                        const res = await BooksModel.find({ _id: { $in: booksInTag } }).sort({ title: 1 });
                        return res;
                    } catch (error) {
                        console.error(`Error loading tag with ID ${tagID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, booksInTagLoader);

    return booksInTagLoader.load(source._id);
};

export const TagsResolver = { booksInTag };
