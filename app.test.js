import app from './app.js'
import request from 'supertest'
import { dbClose, dbConnect } from './db.js'

const DATABASE_URI = 'mongodb://localhost:27017/'
beforeEach(async () => {
  await dbConnect(DATABASE_URI)
})

afterEach(async () => {
  await dbClose()
})

describe('App tests', () => {

  // test home page
  test('Get home page', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.body.title).toBeDefined()
    expect(res.body.title).toBe('Quiz App')
  })
})