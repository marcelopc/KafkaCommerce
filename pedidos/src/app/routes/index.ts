import { Router } from 'express'
import pedidos from './pedidos'

const routes = Router()

routes.use(pedidos)

export default routes
