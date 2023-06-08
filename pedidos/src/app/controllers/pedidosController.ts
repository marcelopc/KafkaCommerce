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
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async listarPedidos (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const pedidoRepository = new PedidoRepository()
      const pedidoService = new PedidoService(pedidoRepository)
      const pedidos = await pedidoService.listarPedidos()

      return response.status(201).json({ pedidos })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async updateStatusPedido (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const body = request.body
      const statusPedido = ['pendente', 'em andamento', 'concluído', 'cancelado']
      if (body.status === null || body.status === undefined || body.status === '' || !statusPedido.includes(body.status)) {
        throw new Error('status inválido')
      }

      const pedidoRepository = new PedidoRepository()
      const pedidoService = new PedidoService(pedidoRepository)
      const pedido = await pedidoService.updateStatusPedido(request.params.idpedido, body.status)

      return response.status(201).json({ pedido })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async excluirPedido (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const pedidoRepository = new PedidoRepository()
      const pedidoService = new PedidoService(pedidoRepository)
      const pedido = await pedidoService.updateStatusPedido(request.params.idpedido, 'excluido')

      return response.status(201).json({ pedido })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}

export default PedidosController
