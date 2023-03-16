import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import initializePassport from './passport-config.js'
import session from 'express-session'
import categoryRouter from './routes/category.js'
import quizRouter from './routes/quiz.js'
import questionsRouter from './routes/question.js'
import authRouter from './routes/auth.js'

//config
const app = express()
dotenv.config()
initializePassport(passport)

//set up for app
app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


// home page
app.get('/', (req, res) => res.send({ title: 'Quiz App'}))

// app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

//all routes
app.use('/categories', categoryRouter)


app.use('/quizzes', quizRouter)


app.use('/questions', questionsRouter)

app.use('/auth', authRouter)



export default app
