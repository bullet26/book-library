import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './src/entities/typeDefs.js';
import { rootResolver } from './src/resolvers/root.js';

const app = express();

export const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: rootResolver,
    csrfPrevention: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/',
    cors(),
    bodyParser.json({ limit: '50mb' }),
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),
    expressMiddleware(server, {
        context: async ({ req }) => ({ req, dataloaders: new WeakMap() }),
    })
);
