export interface Pagamento {
  idPagamentos: string
  pedidoId: string
  valor: number
  metodoPagamento: string
  detalhesPagamento: DetalhesPagamento
  status: string
  createdAt: string
  updatedAt: string
}

export interface DetalhesPagamento {
  numeroCartao: string
  nomeTitular: string
  validadeCartao: string
  cvv: string
}
