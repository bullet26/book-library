import { ApolloServer } from '@apollo/server'
import express from 'express'
import { expressMiddleware } from '@as-integrations/express5'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { typeDefs } from './graphql/schema/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import { router } from './api/router.js'
import { createContext, DataLoadersType } from './graphql/dataloaders/index.js'
import { APP_MODE, CLIENT_URL, DB_URL, PORT } from './config/index.js'
import { HttpError } from './utils/http-error.js'
import { consoleInfo } from './common/index.js'

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
  ...(APP_MODE !== 'vercel' && { plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] }),
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

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    consoleInfo('Connected to DB')

    if (APP_MODE === 'vercel') {
      app.listen(PORT, () => {
        console.log(`REST API  + GRAPHQL Server listening on port VERCEL: ${PORT}`)
      })
    } else {
      await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
    }
    consoleInfo(`REST API  + GRAPHQL Server listening on port http://localhost:${PORT}`)
  } catch (err) {
    console.log(err)
  }
}

start()
