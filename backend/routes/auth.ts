import express, { Request, Response } from 'express'
import { db } from '../db/database'

const router = express.Router()

interface SessionData {
    userId?: number
}

router.put('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, ...rest } = req.body

        if (!id) {
            res.status(400).json({ error: 'не передан user.id' })
            return
        }

        const creator = await db
            .updateTable('creators')
            .set({
                ...rest
            })
            .where('id', '=', id)
            .executeTakeFirst()

        res.status(201).json({ message: 'профиль обновлен', creator })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ error: 'все поля обязательны' })
            return
        }

        const existing = await db
            .selectFrom('creators')
            .select(['id'])
            .where('email', '=', email)
            .executeTakeFirst()

        if (existing) {
            res.status(400).json({ error: 'пользователь с таким email уже есть' })
            return
        }

        const creator = await db
            .insertInto('creators')
            .values({
                first_name: "",
                last_name: "",
                email,
                password,
                avatar: ""
            })
            .returning(['id'])
            .executeTakeFirst()

        res.status(201).json({ message: 'регистрация успешна', creator })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ error: 'введите email и пароль' })
            return
        }

        const user = await db
            .selectFrom('creators')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirst()

        if (!user) {
            res.status(401).json({ error: 'неверный email или пароль' })
            return
        }

        const isMatch = await password === user.password

        if (!isMatch) {
            res.status(401).json({ error: 'неверный email или пароль' })
            return
        }


        (req.session as SessionData).userId = user.id

        res.json({
            user: {
                id: user.id,
            },
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'ошибка сервера' })
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'ошибка при выходе' })
            return
        }
        res.clearCookie('connect.sid')
        res.json({ message: 'выход выполнен' })
    })
})

router.get('/me', async (req, res) => {
    const session = req.session as SessionData
    if (!session.userId) {
        res.status(401).json({ error: 'неавторизован' })
        return
    }

    const user = await db
        .selectFrom('creators')
        .select(['id', 'first_name', 'last_name', 'email', 'creator_description'])
        .where('id', '=', session.userId)
        .executeTakeFirst()

    if (!user) {
        res.status(401).json({ error: 'пользователь не найден' })
        return
    }

    res.json({ user })
})

export default router
