import { type NextFunction, type Request, type Response } from 'express'
import { type Pedidos } from '@src/app/dtos/pedidos'
import { PedidoService } from '@src/domain/services/pedidosServices'
import { PedidoRepository } from '@src/infrastructure/database/repositories/pedidoRepository'

export class PedidosController {
  async criarPedido (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const payload = {
        cliente: request.body.cliente,
        itens: request.body.itens,
        total: request.body.total
      }

      const keys = Object.keys(payload)

      for (const key of keys) {
        if (payload[key as keyof Pedidos] === '' || payload[key as keyof Pedidos] === null || payload[key as keyof Pedidos] === undefined) {
          throw new Error('Campo inválido')
        }
      }
      const pedidoRepository = new PedidoRepository()

      const pedidoService = new PedidoService(pedidoRepository)
      const pedido = await pedidoService.criarPedido(payload.cliente, payload.itens, payload.total)

      return response.status(201).json({ message: 'Pedido criado com sucesso', pedido })
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}

export default PedidosController
