import { Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { DB } from './kysely-types'
import path from 'path'

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database(path.join(__dirname, 'data.db')),
  }),
})
