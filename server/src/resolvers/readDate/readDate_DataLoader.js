import DataLoader from 'dataloader';
import { BooksModel } from '../../models/index.js';

const books = (source, args, context, info) => {
    const { dataloaders } = context;
    let booksLoader = dataloaders.get(info.fieldNodes);

    if (!booksLoader) {
        booksLoader = new DataLoader(async keys => {
            return await Promise.all(
                keys.map(async bookID => {
                    try {
                        const res = await BooksModel.findById(bookID);
                        return res;
                    } catch (error) {
                        console.error(`Error loading books with ID ${bookID}:`, error);
                        return null;
                    }
                })
            );
        });
    }
    dataloaders.set(info.fieldNodes, booksLoader);

    return booksLoader.load(source.bookID);
};

export const ReadDateResolver = { books };
