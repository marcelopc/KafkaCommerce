import { type Pagamento } from '../models/pagamentos'
import { type createPagamento } from '@src/domain/types/pagamentos'

export interface PagamentosRepository {
  criar: (payload: createPagamento) => Promise<Pagamento>
  findAll: (field?: keyof Pagamento, id?: string) => Promise<Pagamento[]>
  updateStatusPagamento: (id: string, status: string) => Promise<Pagamento | null>
  findOne: (field: keyof Pagamento, value: string | Date) => Promise<Pagamento | null>

}
