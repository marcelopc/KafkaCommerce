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

  public async listarPedidos (): Promise<Pedido[]> {
    const pedidos = await this._pedidoRepository.findAll()

    return pedidos
  }

  public async updateStatusPedido (id: string, status: string): Promise<Pedido | null> {
    const pedido = await this._pedidoRepository.updateStatusPedido(id, status)
    return pedido
  }
}
