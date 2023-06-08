import { type Item } from '../types/pedidos'
import { type PedidoRepository } from '../repositories/pedidoRepository'
import { type Pedido } from '../models/pedido'

export class PedidoService {
  private readonly _pedidoRepository: PedidoRepository

  constructor (pedidoRepository: PedidoRepository) {
    this._pedidoRepository = pedidoRepository
  }

  public async criarPedido (cliente: string, itens: Item[], total: number): Promise<Pedido> {
    const novoPedido = {
      cliente,
      itens,
      total
    }

    const pedidoCriado = await this._pedidoRepository.criar(novoPedido)

    return pedidoCriado
  }
}
