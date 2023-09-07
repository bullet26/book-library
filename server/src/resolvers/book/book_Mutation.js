import { BooksModel, ReadDateModel } from '../../models/index.js';

const addBook = async (_, { input }) => {
    // ! TODO fix image cover
    try {
        // const { filename, createReadStream } = await bookCover;
        //const stream = createReadStream();
        const book = await BooksModel.create(input);
        //console.log(input);
        if (input.hasOwnProperty('readEnd')) {
            await ReadDateModel.create({
                bookID: book._id,
                readEnd: input.readEnd,
            });
        }
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const BookMutation = { addBook };
