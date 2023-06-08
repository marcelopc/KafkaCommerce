import { Router } from 'express'
import pagamentos from './pagamentos'

const routes = Router()

routes.use(pagamentos)

export default routes
