import mongoose from 'mongoose'
import { type IDatabase } from './databaseType'

export class Database implements IDatabase {
  _databaseuri: string

  constructor (databaseuri: string) {
    this._databaseuri = databaseuri
  }

  public async connect (): Promise<boolean | Error> {
    await mongoose.connect(this._databaseuri)
    return true
  }
}
