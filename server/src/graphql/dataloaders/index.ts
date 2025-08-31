import DataLoader from 'dataloader';
import { AuthorDL } from './author';
import { BookDL } from './book';
import { ReadDateDL } from './readDate';
import { SeriesDL } from './series';
import { TagsDL } from './tags';

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
