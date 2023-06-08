import express from 'express'
import cors from 'cors'
import { type IDatabase } from '@src/infrastructure/database/databaseType'
import routes from '@src/app/routes'

export class Server {
  private readonly _database
  private readonly _app = express()
  private readonly _port

  constructor (port: string, database: IDatabase) {
    this._database = database
    this._port = port
  }

  public async start (): Promise<void> {
    try {
      await this._database.connect()
      this._app.use(cors())
      this._app.use(express.json())
      this._app.use('/api', routes)
      this._app.listen(this._port, () => { console.log(`Server started on port ${this._port}`) })
    } catch (error) {
      console.log(error)
      console.log('Error starting server')
      process.exit(1)
    }
  }
}

export default { Server }
