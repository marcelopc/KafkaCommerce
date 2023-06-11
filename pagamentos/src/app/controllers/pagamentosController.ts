import { type NextFunction, type Request, type Response } from 'express'
import { type Pagamentos, type DetalhesPagamento } from '@src/app/dtos/pagamentos'
import { PagamentosService } from '@src/domain/services/pagamentosServices'
import { PagamentosRepository } from '@src/infrastructure/database/repositories/pagamentosRepository'
import PagamentoProducer from '@src/infrastructure/kafka/producers/pagamentoProducer'

export class PagamentosController {
  async criarPagamentos (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const payload: Pagamentos = {
        valor: request.body.valor,
        pedidoId: request.body.pedidoId,
        metodoPagamento: request.body.metodoPagamento,
        detalhesPagamento: {
          numeroCartao: request.body.detalhesPagamento.numeroCartao,
          nomeTitular: request.body.detalhesPagamento.nomeTitular,
          validadeCartao: request.body.detalhesPagamento.validadeCartao,
          cvv: request.body.detalhesPagamento.cvv
        }
      }

      const keys = Object.keys(payload)

      for (const key of keys) {
        if (payload[key as keyof Pagamentos] === '' || payload[key as keyof Pagamentos] === null || payload[key as keyof Pagamentos] === undefined) {
          throw new Error(`Não foi informado o campo ${key} no body`)
        }

        if (payload.detalhesPagamento !== null) {
          for (const keyDetalhesPagamento of Object.keys(payload.detalhesPagamento)) {
            if (payload.detalhesPagamento[keyDetalhesPagamento as keyof DetalhesPagamento] === '' ||
              payload.detalhesPagamento[keyDetalhesPagamento as keyof DetalhesPagamento] === null ||
              payload.detalhesPagamento[keyDetalhesPagamento as keyof DetalhesPagamento] === undefined
            ) {
              throw new Error(`Não foi informado o campo ${keyDetalhesPagamento} no body`)
            }
          }
        }
      }

      const pagamentosRepository = new PagamentosRepository()

      const pagamentosService = new PagamentosService(pagamentosRepository)
      const pagamento = await pagamentosService.criarPagamento(payload)

      return response.status(201).json({ message: 'Pagamento realizado com sucesso', pagamento })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async listarPagamentos (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const pagamentosRepository = new PagamentosRepository()
      const pagamentosService = new PagamentosService(pagamentosRepository)
      const pagamentos = await pagamentosService.listarPagamentos()

      return response.status(201).json({ pagamentos })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async updateStatusPagamentos (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const body = request.body
      const statusPedido = ['concluído', 'cancelado', 'excluido']
      if (body.status === null || body.status === undefined || body.status === '' || !statusPedido.includes(body.status)) {
        throw new Error('status inválido')
      }

      const pagamentosRepository = new PagamentosRepository()
      const pagamentosService = new PagamentosService(pagamentosRepository)
      const pedido = await pagamentosService.updateStatusPagamento(request.params.idpagamento, body.status)

      const pagamentoProducer = new PagamentoProducer()

      if (pedido != null) {
        await pagamentoProducer.enviarPagamento(pedido)
      }

      return response.status(201).json({ pedido })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async buscarPagamentosPedido (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const pagamentosRepository = new PagamentosRepository()
      const pagamentosService = new PagamentosService(pagamentosRepository)
      const pagamento = await pagamentosService.buscarPagamentosPedido('pedidoId', request.params.idpedido)

      return response.status(201).json({ pagamento })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async buscarPagamentos (request: Request, response: Response, next: NextFunction): Promise<Response> {
    try {
      const pagamentosRepository = new PagamentosRepository()
      const pagamentosService = new PagamentosService(pagamentosRepository)
      const pagamento = await pagamentosService.buscarPagamento('idPagamentos', request.params.idpagamento)

      return response.status(201).json({ pagamento })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}

export default PagamentosController
