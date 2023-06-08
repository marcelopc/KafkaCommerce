import { Router } from 'express'
import PagamentosController from '@src/app/controllers/pagamentosController'

const routes = Router()
const pagamentosController = new PagamentosController()

routes.post('/pagamentos', pagamentosController.criarPagamentos)

routes.get('/pagamentos', pagamentosController.listarPagamentos)

routes.get('/pagamentos/:idpagamento', pagamentosController.buscarPagamentos)

routes.put('/pagamentos/:idpagamento', pagamentosController.updateStatusPagamentos)

routes.get('/pagamentos/pedidos/:idpedido', pagamentosController.buscarPagamentosPedido)

export default routes
