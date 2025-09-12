import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { typeDefs } from '#graphql/schema/index.js'
import { resolvers } from '#graphql/resolvers/index.js'
import { router } from '#api/router.js'
import { createContext, DataLoadersType } from '#graphql/dataloaders/index.js'
import { APP_MODE, CLIENT_URL } from '#config/index.js'
import { HttpError } from '#utils/http-error.js'

interface MyContext {
  token?: string
  req: express.Request
  dataloaders: DataLoadersType['dataloaders']
}

const app = express()
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
)
app.use(express.json())

export const httpServer = http.createServer(app)

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError, error: any) => {
    const original = error.originalError

    if (original instanceof HttpError) {
      return {
        message: original.message,
        status: original.status,
        code: 'HTTP_ERROR',
      }
    }

    return {
      message: formattedError.message || 'Internal server error',
      code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR',
    }
  },
})

await server.start()

mongoose.set('debug', APP_MODE === 'development')

app.use(
  '/graphql',
  cors<cors.CorsRequest>({ origin: CLIENT_URL }),
  bodyParser.json({ limit: '10mb' }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const dl = await createContext()
      return { req, ...dl }
    },
  }),
)

app.use('/api', router)

app.use('/', (req, res) => {
  res.status(200).send('Server is running')
})
