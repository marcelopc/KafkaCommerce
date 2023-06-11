import express from 'express'
import cors from 'cors'
import { type IDatabase } from '@src/infrastructure/database/databaseType'
import routes from '@src/app/routes'
import PedidoConsumer from '@src/infrastructure/kafka/consumers/pedidoConsumer'
import { PedidoService } from '@src/domain/services/pedidosServices'
import { PedidoRepository } from '@src/infrastructure/database/repositories/pedidoRepository'

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

      const pedidoRepository = new PedidoRepository()
      const pedidoService = new PedidoService(pedidoRepository)
      const pedidoConsumer = new PedidoConsumer()
      await pedidoConsumer.iniciarConsumo(pedidoService)

      this._app.listen(this._port, () => { console.log(`Server started on port ${this._port}`) })
    } catch (error) {
      console.log(error)
      console.log('Error starting server')
      process.exit(1)
    }
  }
}

export default { Server }
