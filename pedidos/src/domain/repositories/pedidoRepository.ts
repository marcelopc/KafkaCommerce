import { type Pedido, type Item } from '../models/pedido'

interface PedidoPayload {
  cliente: string
  itens: Item[]
  total: number
}
export interface PedidoRepository {
  criar: (payload: PedidoPayload) => Promise<Pedido>
  findAll: () => Promise<Pedido[]>
}
