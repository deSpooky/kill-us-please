import express from 'express'
import session from 'express-session'
import cors from 'cors'
import authRouter from './routes/auth'
import casesRouter from './routes/cases'
import creatorsRouter from './routes/creators'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use(session({
    secret: 'spooky',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use('/auth', authRouter)
app.use('/cases', casesRouter)
app.use('/creators', creatorsRouter)
app.use('/images', express.static(path.join(__dirname, 'db/images')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000')
})
