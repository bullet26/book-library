import DataLoader from 'dataloader';
import { AuthorDL } from './author.js';
import { BookDL } from './book.js';
import { ReadDateDL } from './readDate.js';
import { SeriesDL } from './series.js';
import { TagsDL } from './tags.js';

type DataLoaderItem = { [key: string]: DataLoader<string, any[]> };

export interface DataLoadersType {
    // TODO: improve 'any' type
    dataloaders: {
        author: DataLoaderItem;
        book: DataLoaderItem;
        readDate: DataLoaderItem;
        series: DataLoaderItem;
        tags: DataLoaderItem;
    };
}

export const createContext = async (): Promise<DataLoadersType> => ({
    dataloaders: {
        author: AuthorDL,
        book: BookDL,
        readDate: ReadDateDL,
        series: SeriesDL,
        tags: TagsDL,
    },
});
