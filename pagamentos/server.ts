import dotenv from 'dotenv'
import { Server } from '@src/app'
import { Database } from './src/infrastructure/database'

import dotenvExpand from 'dotenv-expand'
dotenvExpand.expand(dotenv.config())
const PORT = process.env.PORT as string
const URIDATABASE = process.env.MONGO_URI as string
const database = new Database(URIDATABASE)

const server = new Server(PORT, database)
server.start().then().catch(error => { console.log(error) })
