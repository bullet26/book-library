import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { print } from 'graphql'

import { router } from './api/router.js'
import { APP_MODE, CLIENT_URL } from './config/index.js'
import { createContext, DataLoadersType } from './graphql/dataloaders/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import { typeDefs } from './graphql/schema/index.js'
import { HttpError } from './utils/http-error.js'
import { consoleInfo } from './common/index.js'

interface MyContext {
  dataloaders: DataLoadersType['dataloaders']
  req: express.Request
  token?: string
}

const app = express()
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  }),
)
app.use(express.json())

const httpServer = http.createServer(app)

consoleInfo(print(typeDefs)) // TODO remove

const server = new ApolloServer<MyContext>({
  csrfPrevention: true,
  introspection: true,
  resolvers,
  typeDefs,
  ...(APP_MODE !== 'vercel' && { plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] }),
  formatError: (formattedError, error: any) => {
    const original = error.originalError

    if (original instanceof HttpError) {
      return {
        code: 'HTTP_ERROR',
        message: original.message,
        status: original.status,
      }
    }

    return {
      code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR',
      message: formattedError.message || 'Internal server error',
    }
  },
})

await server.start()

mongoose.set('debug', APP_MODE === 'development')

app.use(
  '/graphql',
  bodyParser.json({ limit: '10mb' }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const dl = await createContext()
      return { req, ...dl }
    },
  }),
)

app.use('/api', router)

app.get('/', (req, res) => {
  res.status(200).send('Server is running')
})

export { app, httpServer }
