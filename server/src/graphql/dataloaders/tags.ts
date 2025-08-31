import DataLoader from 'dataloader';
import { BookTagRelationsModel } from '../../models/index.js';

export const TagsDL = {
    booksInTag: new DataLoader(async (tagIDs: readonly string[]) => {
        const booksInTagObj = await BookTagRelationsModel.find({ BookTagRelationsModel: { $in: tagIDs } });
        const booksInTagIds = booksInTagObj.map(item => item.bookID);
        return tagIDs.map(id => booksInTagIds.filter(bookID => booksInTagObj.find(item => item?.bookID === bookID && item?.tagID === id)));
    }),
};
