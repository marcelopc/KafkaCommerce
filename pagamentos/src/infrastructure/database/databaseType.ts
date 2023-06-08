export interface IDatabase {
  _databaseuri: string
  connect: () => Promise<boolean | Error>
}
