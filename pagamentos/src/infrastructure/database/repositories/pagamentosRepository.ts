import { type PagamentosRepository as IPagamentosRepository } from '@src/domain/repositories/pagamentosRepository'
import { pagamentos } from '../models/pagamentos'
import crypter from '@src/shared/utils/crypt'
import { type Pagamento } from '@src/domain/models/pagamentos'
import { type createPagamento } from '@src/domain/types/pagamentos'

export class PagamentosRepository implements IPagamentosRepository {
  _pagamentoModel = pagamentos

  async criar (pagamento: createPagamento): Promise<Pagamento> {
    const date = new Date().toISOString()
    const payload: Pagamento = {
      idPagamentos: crypter.uuid(),
      pedidoId: pagamento.pedidoId,
      valor: pagamento.valor,
      metodoPagamento: pagamento.metodoPagamento,
      detalhesPagamento: {
        numeroCartao: pagamento.detalhesPagamento.numeroCartao,
        nomeTitular: pagamento.detalhesPagamento.nomeTitular,
        validadeCartao: pagamento.detalhesPagamento.validadeCartao,
        cvv: pagamento.detalhesPagamento.cvv
      },
      status: 'concluído',
      createdAt: date,
      updatedAt: date
    }

    const pagamentoCriado = await this._pagamentoModel.create(payload)
    return this.mapperPagamento(pagamentoCriado)
  }

  async findAll (field?: keyof Pagamento, id?: string): Promise<Pagamento[]> {
    if (field !== undefined && id !== undefined) {
      const pagamentos: Pagamento[] = await this._pagamentoModel.find({ [field]: id }).exec()
      return this.mapper(pagamentos)
    }

    const pagamentos: Pagamento[] = await this._pagamentoModel.find().exec()
    return this.mapper(pagamentos)
  }

  async updateStatusPagamento (idPagamentos: string, status: string): Promise<Pagamento | null> {
    const pagamento = await this._pagamentoModel.findOneAndUpdate({ idPagamentos }, { status }, { new: true }).exec()
    if (pagamento !== null) {
      return this.mapperPagamento(pagamento)
    }
    return null
  }

  async findOne (field: keyof Pagamento, value: string | Date): Promise<Pagamento | null> {
    const pagamento = await this._pagamentoModel.findOne({ [field]: value }).exec()
    if (pagamento === null) { return null }
    return this.mapperPagamento(pagamento)
  }

  private mapper (pagamentos: Pagamento[]): Pagamento[] {
    return pagamentos.map(pagamento => this.mapperPagamento(pagamento))
  }

  private mapperPagamento (pagamento: Pagamento): Pagamento {
    return {
      idPagamentos: pagamento.idPagamentos,
      pedidoId: pagamento.pedidoId,
      valor: pagamento.valor,
      metodoPagamento: pagamento.metodoPagamento,
      detalhesPagamento: {
        numeroCartao: pagamento.detalhesPagamento.numeroCartao,
        nomeTitular: pagamento.detalhesPagamento.nomeTitular,
        validadeCartao: pagamento.detalhesPagamento.validadeCartao,
        cvv: pagamento.detalhesPagamento.cvv
      },
      status: pagamento.status,
      createdAt: pagamento.createdAt,
      updatedAt: pagamento.updatedAt
    }
  }
}
