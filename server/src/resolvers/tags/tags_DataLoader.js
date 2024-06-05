import DataLoader from 'dataloader';
import { BooksModel, BookTagRelationsModel } from '../../models/index.js';

const booksInTag = (source, args, context, info) => {
    const { sortBy } = source;
    const { dataloaders } = context;
    let booksInTagLoader = dataloaders.get(info.fieldNodes);

    if (!booksInTagLoader) {
        booksInTagLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async tagID => {
                    try {
                        const booksInTagObj = await BookTagRelationsModel.find({ tagID });
                        const booksInTag = booksInTagObj.map(item => item.bookID);

                        if (sortBy === 'title') {
                            const res = await BooksModel.find({ _id: { $in: booksInTag } }).sort({ title: 1 });
                            return res;
                        }
                        if (sortBy === 'author') {
                            const res = await BooksModel.aggregate([
                                {
                                    $match: { _id: { $in: booksInTag } },
                                },
                                {
                                    $lookup: {
                                        from: 'authors',
                                        localField: 'authorID',
                                        foreignField: '_id',
                                        as: 'authorData',
                                    },
                                },
                                {
                                    $unwind: '$authorData',
                                },
                                {
                                    $addFields: {
                                        authorSurname: '$authorData.surname',
                                    },
                                },
                                {
                                    $sort: { authorSurname: 1, title: 1 },
                                },
                                {
                                    $project: {
                                        authorSurname: 0,
                                        authorData: 0,
                                    },
                                },
                            ]);

                            console.log(res);
                            return res;
                        }
                        return null;
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
