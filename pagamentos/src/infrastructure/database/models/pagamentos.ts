import mongoose from 'mongoose'
import { type Pagamento, type DetalhesPagamento } from '@src/domain/models/pagamentos'

const detalhesPagamentoSchema = new mongoose.Schema<DetalhesPagamento>({
  numeroCartao: { type: String, required: true },
  nomeTitular: { type: String, required: true },
  validadeCartao: { type: String, required: true },
  cvv: { type: String, required: true }
})

const pagamentoSchema = new mongoose.Schema<Pagamento>({

  idPagamentos: { type: String, required: true },
  pedidoId: { type: String, required: true },
  valor: { type: Number, required: true },
  metodoPagamento: { type: String, required: true },
  detalhesPagamento: detalhesPagamentoSchema,
  status: {
    type: String,
    enum: ['concluído', 'cancelado', 'excluido'],
    default: 'pendente',
    required: true
  },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
})

export const pagamentos = mongoose.model<Pagamento>('pagamentos', pagamentoSchema)

export default { pagamentos }
