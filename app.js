import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import MongoDBStore from 'connect-mongodb-session'
// import session from 'express-session'
import categoryRouter from './routes/category.js'
import quizRouter from './routes/quiz.js'
import questionsRouter from './routes/question.js'
import authRouter from './routes/auth.js'
import config from './passport-config.js'

//config
const app = express()
dotenv.config()

//set up mongo store
// const mongoStore = MongoDBStore(session)
// const store = new mongoStore({
//   collection: 'userSessions', 
//   uri: process.env.ATLAS_DB_URL,
//   exprire: 1000,
// })

//set up for app
app.use(cors({ 
  credentials: true, 
  origin: true, 
}))

app.use(express.json())
// app.use(session({
//   secret: process.env.SESSION_SECRET, 
//   resave: false,
//   store: store,
//   cookie: { maxAge: 60 * 60 * 1000 },
//   saveUninitialized: false
// }))
// config(passport)
// app.use(passport.initialize())

// app.use(passport.session())
app.use(cookieParser(process.env.SESSION_SECRET))

//testing - delete when done
app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

// home page
app.get('/', (req, res) => res.send({ title: 'Quiz App'}))

// app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

//all routes
app.use('/categories', categoryRouter)


app.use('/quizzes', quizRouter)


app.use('/questions', questionsRouter)

app.use('/auth', authRouter)



export default app
