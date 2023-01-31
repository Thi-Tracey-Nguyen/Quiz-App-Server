import app from './app.js'
import request from 'supertest'

describe('App tests', () => {

  // test home page
  test('Get home page', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.body.title).toBeDefined()
    expect(res.body.title).toBe('Quiz App')
  })

  describe('Test categories route', () => {
    let res

    describe('Getting categories list', () => {
      
      // common exertions for all tests
      beforeEach(async () => {
        res = await request(app).get('/categories')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
      })
  
      it('Should return an array of 4 elements', () => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBe(3)
      })
  
      it('Has elements with the correct data structure', () => {
        
        // each element to have an id of 24 characters, and a name property
        res.body.forEach(el => {
          expect(el._id).toBeDefined()
          expect(el._id.length).toBe(24)
          expect(el.name).toBeDefined()
        })
  
        // the first element's name is Science
        expect(res.body[0].name).toBe('Science')
        expect(res.body[1].name).toBe('TV & Movies')
        expect(res.body[2].name).toBe('Geography')
        })
      })

      describe('Creating a new category', () => {

      })

      describe('Creating a duplicated category', () => {
        
      })

      describe('Deleting a category', () => {
        
      })
    })
    
    

  // testing quizzes route
  describe('Test quizzes route', () => {
    describe('Test getting all quizzes', () => {
      // common exertions for all tests
      beforeEach(async () => {
        res = await request(app).get('/quizzes')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
      })

    })


    describe('Test posting a quiz', () => {
      test('Create a new quiz', async () => {
        const cats = await request(app).get('/categories')
        const newQuizTitle = 'Jest Testing'
        const res = await request(app).post('/quizzes').send({
          category: 'Science',
          title: newQuizTitle,
          author: 'Dev Team',
          image: 'http://placekitten.com/200/300'
        })
  
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body._id).toBeDefined()
        expect(res.body.category).toBeDefined()
        expect(res.body.title).toBeDefined()
        expect(res.body.author).toBeDefined()
        expect(res.body.image).toBeDefined()
        expect(res.body.category).toBe(cats.body[0]._id)
        expect(res.body.title).toBe(newQuizTitle)
        expect(res.body.author).toBe('Dev Team')
        expect(res.body.image).toBe('http://placekitten.com/200/300')
      })
  
      test('Create a quiz with duplicate title', async () => {
        const newQuizTitle = 'Jest Testing'
        const res = await request(app).post('/quizzes').send({
          category: 'Science',
          title: newQuizTitle,
          author: 'Dev Team',
          image: 'http://placekitten.com/200/300'
        })
  
        expect(res.status).toBe(500)
      })
    })
    
  })
})