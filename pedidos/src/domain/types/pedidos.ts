export interface Pedido {
  cliente: string
  itens: Item[]
  total: number
  status: string
}

export interface Item {
  produto: string
  quantidade: number
  preco: number
}
