import mongoose from 'mongoose';
import { httpServer } from './index.js';
import { connectionOptions, DB_URL, PORT } from './src/config/config.js';
import { consoleInfo } from './src/utils/logger.js';

(async () => {
    try {
        await mongoose.connect(DB_URL, connectionOptions);
        consoleInfo('Connected to DB');

        await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
        consoleInfo(`Server listening on port http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
    }
})();
