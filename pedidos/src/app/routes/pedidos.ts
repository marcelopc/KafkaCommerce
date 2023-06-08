import { Router } from 'express'
import PedidosController from '@src/app/controllers/pedidosController'

const routes = Router()
const pedidosController = new PedidosController()

routes.get('/pedidos', (request, response) => { response.send({ message: 'Hello World' }) })

routes.post('/pedidos', pedidosController.criarPedido)

routes.get('/pedidos/:idpedido', (request, response) => { response.send({ message: 'Hello World' }) })

routes.put('/pedidos/:idpedido', (request, response) => { response.send({ message: 'Hello World' }) })

routes.delete('/pedidos/:idpedido', (request, response) => { response.send({ message: 'Hello World' }) })

export default routes
