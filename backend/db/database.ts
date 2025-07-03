import { Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { DB } from './kysely-types'

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('data.db'),
  }),
})
