export interface Pagamentos {
  valor: number
  metodoPagamento: string
  detalhesPagamento: DetalhesPagamento
  pedidoId: string
}

export interface DetalhesPagamento {
  numeroCartao: string
  nomeTitular: string
  validadeCartao: string
  cvv: string
}
