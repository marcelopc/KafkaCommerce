import mongoose from 'mongoose'
import { type Pedido, type Item } from '@src/domain/models/pedido'

const itemSchema = new mongoose.Schema<Item>({
  produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true }
})

const pedidoSchema = new mongoose.Schema<Pedido>({
  idPedido: { type: String, required: true },
  cliente: { type: String, required: true },
  itens: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pendente', 'em andamento', 'concluído', 'cancelado'],
    default: 'pendente',
    required: true
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
})

export const pedidos = mongoose.model<Pedido>('pedidos', pedidoSchema)

export default { pedidos }
