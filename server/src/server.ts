import mongoose from 'mongoose'
import { consoleInfo } from './common/index.js'
import { DB_URL, PORT } from './config/index.js'
import { httpServer } from './app.js'

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    consoleInfo('Connected to DB')

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
    consoleInfo(`REST API  + GRAPHQL Server listening on port http://localhost:${PORT}`)
  } catch (err) {
    console.log(err)
  }
}

start()
