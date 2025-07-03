import { db } from './database'

async function migrate() {
  await db.schema
    .createTable('creators')
    .ifNotExists()
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('creator_nickname', 'text', (column) => column.notNull())
    .addColumn('email', 'text', (column) => column.notNull().unique())
    .addColumn('password', 'text', (column) => column.notNull())
    .addColumn('creator_description', 'text')
    .execute()

  await db.schema
    .createTable('cases')
    .ifNotExists()
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('title', 'text', (column) => column.notNull())
    .addColumn('case_description', 'text')
    .addColumn('source_file_url', 'text')
    .addColumn('creator_nickname', 'text', (column) => column.references('creator_nickname').onDelete('set null'))
    .addColumn('created_at', 'text', (column) => column.notNull().defaultTo('CURRENT_TIMESTAMP'))
    .execute()

  console.log('база данных успешно создана! :D')
  process.exit(0)
}

migrate().catch((error) => {
  console.error('ошибка миграции :(', error)
  process.exit(1)
})
