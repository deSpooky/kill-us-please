import { db } from './database'

async function migrate() {
  await db.schema
    .createTable('creators')
    .ifNotExists()
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('first_name', 'text', (column) => column.notNull())
    .addColumn('last_name', 'text', (column) => column.notNull())
    .addColumn('email', 'text', (column) => column.notNull().unique())
    .addColumn('password', 'text', (column) => column.notNull())
    .addColumn('creator_description', 'text')
    .addColumn('avatar', 'text')
    .execute()

  await db.schema
    .createTable('cases')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('case_description', 'text')
    .addColumn('source_file_url', 'text')
    .addColumn('creator_id', 'integer', (col) => col.references('creators.id').onDelete('set null'))
    .addColumn('likes', 'integer')
    .addColumn('views', 'integer')
    .addColumn('created_at', 'text', (col) => col.notNull().defaultTo('CURRENT_TIMESTAMP'))
    .execute()

  console.log('база данных успешно создана! :D')
  process.exit(0)
}

migrate().catch((error) => {
  console.error('ошибка миграции :(', error)
  process.exit(1)
})
