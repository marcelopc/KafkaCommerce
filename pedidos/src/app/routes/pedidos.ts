import { Router } from 'express'
import PedidosController from '@src/app/controllers/pedidosController'

const routes = Router()
const pedidosController = new PedidosController()

routes.get('/pedidos', pedidosController.listarPedidos)

routes.post('/pedidos', pedidosController.criarPedido)

routes.get('/pedidos/:idpedido', pedidosController.buscarPedido)

routes.put('/pedidos/:idpedido', pedidosController.updateStatusPedido)

routes.delete('/pedidos/:idpedido', pedidosController.excluirPedido)

export default routes
