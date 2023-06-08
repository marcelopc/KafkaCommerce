export interface Pedidos {
  cliente: string
  itens: Item[]
  total: number
}

export interface Item {
  produto: string
  quantidade: number
  preco: number
}
