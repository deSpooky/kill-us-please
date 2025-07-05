import express, { type Request, type Response } from 'express'
import { db } from '../db/database'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        // const { tag } = req.query

        let query = db
            .selectFrom('creators')
            // .innerJoin('cases', 'creators.id', 'cases.creator_id')
            .select([
                'creators.id',
                'creators.first_name',
                'creators.last_name',
                'creators.email',
                'creators.creator_description',
                'creators.avatar',
                // 'cases.tag'
            ])

        // if (tag) {
        //     query = query.where('cases.tag', '=', String(tag))
        // }

        const creators = await query.execute()

        res.status(200).json(
            creators.map(({ id, first_name, last_name, email, creator_description, avatar }) => ({
                id,
                first_name,
                last_name,
                email,
                creator_description,
                avatar,
                // tag
            })))
    } catch (err) {
        console.error('ошибка чтения из БД:', err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

router.put('/:creatorId', async (req: Request, res: Response): Promise<void> => {
    try {
        const creatorId = +req.params.creatorId

        if (Number.isNaN(creatorId)) {
            throw new Error('Invalid creatorId (must be a number)')
        }

        const updatedCreator = await db
            .updateTable('creators')
            .set({
                ...req.body
            })
            .where('id', '=', creatorId)
            .executeTakeFirst()

        res.status(201).json({ message: 'профиль обновлен', updatedCreator })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})

router.get('/:creatorId', async (req: Request, res: Response) => {
    try {
        const creatorId = +req.params.creatorId

        if (Number.isNaN(creatorId)) {
            throw new Error('Invalid creatorId (must be a number)')
        }

        const { first_name, last_name, email, creator_description, avatar } = await db
            .selectFrom('creators')
            .select([
                'creators.first_name',
                'creators.last_name',
                'creators.email',
                'creators.creator_description',
                'creators.avatar',
            ])
            .where('creators.id', '=', creatorId)
            .executeTakeFirstOrThrow()

        res.status(200).json({
            first_name,
            last_name,
            email,
            creator_description,
            avatar
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

export default router
