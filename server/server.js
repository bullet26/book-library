import mongoose from 'mongoose';
import { graphqlServer } from './graphql_index.js';
import { restApp } from './rest_index.js';
import { connectionOptions, DB_URL, PORT } from './src/config/config.js';
import { consoleInfo } from './src/utils/logger.js';

(async () => {
    try {
        await mongoose.connect(DB_URL, connectionOptions);
        consoleInfo('Connected to DB');

        await new Promise(resolve => graphqlServer.listen({ port: PORT }, resolve));
        consoleInfo(`GRAPHQL Server listening on port http://localhost:${PORT}`);

        const REST_PORT = Number(PORT) + 1;
        await new Promise(resolve => restApp.listen({ port: REST_PORT }, resolve));
        consoleInfo(`REST API Server listening on port http://localhost:${REST_PORT}`);
    } catch (err) {
        console.log(err);
    }
})();
