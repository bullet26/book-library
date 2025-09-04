import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { typeDefs } from '#graphql/schema/index.js';
import { resolvers } from '#graphql/resolvers/index.js';
import { router } from '#api/router.js';
import { createContext, DataLoadersType } from '#graphql/dataloaders/index.js';
import { APP_MODE } from '#config/index.js';

interface MyContext {
    token?: string;
    req: express.Request;
    dataloaders: DataLoadersType['dataloaders'];
}

const app = express();
app.use(cors());
app.use(express.json());

export const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

mongoose.set('debug', APP_MODE === 'development');

app.use(
    '/graphql',
    bodyParser.json({ limit: '10mb' }),
    expressMiddleware(server, {
        context: async ({ req }) => {
            const dl = await createContext();
            return { req, ...dl };
        },
    })
);

app.use('/api', router);
