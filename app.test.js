import app from './app.js'
import request from 'supertest'

describe('App tests', () => {
  test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.body.title).toBeDefined()
    expect(res.body.title).toBe('Quiz App')
  })
})