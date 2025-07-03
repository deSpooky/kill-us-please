import express, { type Request, type Response } from 'express'
import multer from 'multer'
import path from 'path'
import { db } from '../db/database'

const router = express.Router()

const upload = multer({
    dest: path.join(__dirname, '../uploads'),
})

router.get('/:caseId', async (req: Request, res: Response) => {
    try {
        const caseId = +req.params.caseId
        if (Number.isNaN(caseId)) {
            throw new Error('Invalid caseId (must be a number)')
        }
        const caseRow = await db.selectFrom('cases').selectAll().where('id', '=', caseId).executeTakeFirstOrThrow()
        res.status(200).json(caseRow)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

router.get('/', async (_: Request, res: Response) => {
    try {
        const cases = await db.selectFrom('cases').selectAll().execute()
        res.status(200).json(cases)
    } catch (err) {
        console.error('ошибка чтения из БД:', err)
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
        const { title, case_description, creator_firstname, creator_lastname} = req.body
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
                    creator_firstname,
                    creator_lastname,
                    source_file_url,
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
