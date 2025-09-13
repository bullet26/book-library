import mongoose from 'mongoose'
import { app, httpServer } from './app.js'
import { consoleInfo } from './common/index.js'
import { APP_MODE, DB_URL, PORT } from './config/index.js'

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    consoleInfo('Connected to DB')

    if (APP_MODE === 'vercel') {
      app.listen(PORT, () => {
        consoleInfo(`REST API  + GRAPHQL Server listening on port VERCEL: ${PORT}`)
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
