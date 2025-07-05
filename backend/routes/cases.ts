import express, { type Request, type Response } from 'express'
import multer from 'multer'
import path from 'path'
import { db } from '../db/database'
import { randomUUID } from 'crypto'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
    const unique = Date.now() + '-' + randomUUID()
    cb(null, `${base}-${unique}${ext}`)
  },
})

const upload = multer({ storage })

router.get('/', async (req: Request, res: Response) => {
  try {
    const { creator_id, tag, sort, order } = req.query

    let query = db
      .selectFrom('cases')
      .innerJoin('creators', 'creators.id', 'cases.creator_id')
      .select([
        'cases.id as case_id',
        'cases.title',
        'cases.case_description',
        'cases.source_file_url',
        'cases.likes',
        'cases.views',
        'cases.created_at',
        'cases.tag',
        'creators.id as creator_id',
        'creators.first_name',
        'creators.last_name',
        'creators.email',
        'creators.creator_description',
        'creators.avatar',
      ])

    if (creator_id) {
      query = query.where('cases.creator_id', '=', Number(creator_id))
    }

    if (tag) {
      query = query.where('cases.tag', '=', String(tag))
    }

    const allowedSortFields = ['likes', 'views', 'created_at']
    const sortField =
      typeof sort === 'string' && allowedSortFields.includes(sort) ? sort : 'created_at'
    const sortDirection = order === 'desc' ? 'desc' : 'asc'

    query = query.orderBy(`cases.${sortField}` as any, sortDirection)

    const cases = await query.execute()

    res.status(200).json(
      cases.map((row) => ({
        id: row.case_id,
        title: row.title,
        description: row.case_description,
        source_file_url: row.source_file_url,
        likes: row.likes,
        views: row.views,
        created_at: row.created_at,
        tag: row.tag,
        creator: {
          id: row.creator_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          creator_description: row.creator_description,
          avatar: row.avatar,
        },
      }))
    )
  } catch (err) {
    console.error('ошибка чтения из БД:', err)
    res.status(500).json({ error: 'ошибка сервера' })
  }
})

router.get('/:caseId', async (req: Request, res: Response) => {
  try {
    const caseId = +req.params.caseId
    if (Number.isNaN(caseId)) {
      throw new Error('Invalid caseId (must be a number)')
    }

    const row = await db
      .selectFrom('cases')
      .innerJoin('creators', 'creators.id', 'cases.creator_id')
      .select([
        'cases.id as case_id',
        'cases.title',
        'cases.case_description',
        'cases.source_file_url',
        'cases.likes',
        'cases.views',
        'cases.created_at',
        'cases.tag',
        'creators.id as creator_id',
        'creators.first_name',
        'creators.last_name',
        'creators.email',
        'creators.creator_description',
        'creators.avatar',
      ])
      .where('cases.id', '=', caseId)
      .executeTakeFirstOrThrow()

    res.status(200).json({
      id: row.case_id,
      title: row.title,
      description: row.case_description,
      source_file_url: row.source_file_url,
      likes: row.likes,
      views: row.views,
      created_at: row.created_at,
      tag: row.tag,
      creator: {
        id: row.creator_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        creator_description: row.creator_description,
        avatar: row.avatar,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'ошибка сервера' })
  }
})

router.post(
  '/',
  upload.single('source_file'),
  async (
    req: Request & { file?: Express.Multer.File },
    res: Response
  ): Promise<void> => {
    const { title, case_description, creator_id, likes, views, tag } = req.body
    const file = req.file

    if (!title) {
      res.status(400).json({ error: 'title обязателен' })
      return
    }

    const source_file_url = file ? `/uploads/${file.filename}` : null

    try {
      const newCase = await db
        .insertInto('cases')
        .values({
          title,
          case_description,
          source_file_url,
          creator_id: Number(creator_id),
          likes: Number(likes) || 0,
          views: Number(views) || 0,
          tag,
        })
        .returningAll()
        .executeTakeFirst()

      res.status(201).json(newCase)
    } catch (err) {
      console.error('ошибка вставки в БД:', err)
      res.status(500).json({ error: 'ошибка сервера' })
    }
  }
)

export default router