import app from "./app"
import request from 'supertest'

describe('App tests', () => {
  //testing the home page
  test('GET /', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body.title).toBeDefined()
    expect(res.body.title).toBe('Quiz App')
  })

  // testing categories route
  test('GET /categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBe(3)
  })

})