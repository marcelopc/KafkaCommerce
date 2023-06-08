import { type PedidoRepository as IPedidoRepository } from '@src/domain/repositories/pedidoRepository'
import { pedidos } from '../models/pedidos'
import crypter from '@src/shared/utils/crypt'
import { type Pedido, type Item } from '@src/domain/models/pedido'

interface PedidoPayload {
  cliente: string
  itens: Item[]
  total: number
}

export class PedidoRepository implements IPedidoRepository {
  _pedidoModel = pedidos

  async criar (pedido: PedidoPayload): Promise<Pedido> {
    const date = new Date().toISOString()
    const payload = {
      idPedido: crypter.uuid(),
      cliente: pedido.cliente,
      itens: pedido.itens,
      total: pedido.total,
      status: 'pendente',
      createdAt: date,
      updatedAt: date
    }

    const pedidoCriado = await this._pedidoModel.create(payload)
    return this.mapperPedido(pedidoCriado)
  }

  async findAll (): Promise<Pedido[]> {
    const pedidos: Pedido[] = await this._pedidoModel.find().exec()
    return this.mapper(pedidos)
  }

  async updateStatusPedido (idPedido: string, status: string): Promise<Pedido | null> {
    const pedido = await this._pedidoModel.findOneAndUpdate({ idPedido }, { status }, { new: true }).exec()
    if (pedido !== null) {
      return this.mapperPedido(pedido)
    }
    return null
  }

  private mapper (pedidos: Pedido[]): Pedido[] {
    return pedidos.map(pedido => this.mapperPedido(pedido))
  }

  private mapperPedido (pedido: Pedido): Pedido {
    return {
      idPedido: pedido.idPedido,
      cliente: pedido.cliente,
      itens: this.mapperItens(pedido.itens),
      total: pedido.total,
      status: pedido.status,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt
    }
  }

  private mapperItens (itens: Item[]): Item[] {
    return itens.map(item => {
      return {
        produto: item.produto,
        preco: item.preco,
        quantidade: item.quantidade
      }
    })
  }
}
