import { type createPagamento } from '../types/pagamentos'
import { type PagamentosRepository } from '../repositories/pagamentosRepository'
import { type Pagamento } from '../models/pagamentos'

export class PagamentosService {
  private readonly _pagamentoRepository: PagamentosRepository

  constructor (pedidoRepository: PagamentosRepository) {
    this._pagamentoRepository = pedidoRepository
  }

  public async criarPagamento (payload: createPagamento): Promise<Pagamento> {
    const pagamentoCriado = await this._pagamentoRepository.criar(payload)

    return pagamentoCriado
  }

  public async listarPagamentos (): Promise<Pagamento[]> {
    const pagamentos = await this._pagamentoRepository.findAll()

    return pagamentos
  }

  public async updateStatusPagamento (id: string, status: string): Promise<Pagamento | null> {
    const pagamento = await this._pagamentoRepository.updateStatusPagamento(id, status)
    return pagamento
  }

  public async buscarPagamento (field: keyof Pagamento, id: string): Promise<Pagamento | null> {
    const pagamento = await this._pagamentoRepository.findOne(field, id)
    return pagamento
  }

  public async buscarPagamentosPedido (field: keyof Pagamento, id: string): Promise<Pagamento[] | null> {
    const pagamentos = await this._pagamentoRepository.findAll(field, id)
    return pagamentos
  }
}
