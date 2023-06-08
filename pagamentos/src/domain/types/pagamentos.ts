export interface createPagamento {
  pedidoId: string
  valor: number
  metodoPagamento: string
  detalhesPagamento: DetalhesPagamento
}

export interface DetalhesPagamento {
  numeroCartao: string
  nomeTitular: string
  validadeCartao: string
  cvv: string
}
