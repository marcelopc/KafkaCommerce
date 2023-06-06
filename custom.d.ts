import { type CreateUserType } from '@core/types/user/userTypes'

declare global{
  namespace Express {
    export interface Request {
      user?: CreateUserType
    }
  }
}
