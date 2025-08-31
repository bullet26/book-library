import mongoose from 'mongoose';
import { consoleInfo } from './common';
import { DB_URL, PORT } from './config';
import { httpServer } from './app';

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        consoleInfo('Connected to DB');

        await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
        consoleInfo(`REST API  + GRAPHQL Server listening on port http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
    }
};

start();
