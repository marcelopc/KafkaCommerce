export interface Pedido {
  idPedido: string
  cliente: string
  itens: Item[]
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Item {
  produto: string
  quantidade: number
  preco: number
}
