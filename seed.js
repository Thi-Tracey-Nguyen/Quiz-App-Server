import { dbClose } from './db.js'
import bcrypt from 'bcrypt'
import CategoryModel from './models/categoryModel.js'
import QuestionModel from './models/questionModel.js'
import QuizModel from './models/quizModel.js'
import UserModel from './models/userModel.js'

// Remove all entries from the database
await QuestionModel.deleteMany()
console.log('All questions deleted')
await QuizModel.deleteMany()
console.log('All quizzes deleted')
await CategoryModel.deleteMany()
console.log('All categories deleted')
await UserModel.deleteMany()
console.log('All users deleted')

// Create admin user and test user

const userArray = [
	{
		username: 'admin',
		password: await bcrypt.hash('admin123', 10),
		isAdmin: true
	}, 
	{
		username: 'tester',
		password: await bcrypt.hash('tester123', 10),
	}
]

// Insert users into the database
const users = await UserModel.insertMany(userArray)
console.log('All users seeded successfully')

// Create categories to seed
const categoriesArray = [
    { name: 'Science' },
    { name: 'TV & Movies' },
    { name: 'Geography' },
    { name: 'Music' }
]

// Insert categories into the database
const categories = await CategoryModel.insertMany(categoriesArray)
console.log('All categories seeded successfully')

const quizzesArray = [
    { category: categories[0], title: 'Random Facts', author: users[0].username, questions: [], image: '/question-mark.png', authorId: users[0]._id },
    { category: categories[0], title: 'Chemistry Facts', author: users[0].username, questions: [], image: '/maths.png', authorId: users[0]._id },
    { category: categories[1], title: 'Movie Trivia', author: users[0].username, questions: [], image: '/movies.png', authorId: users[0]._id},
    { category: categories[1], title: 'Geeky TV Shows', author: users[0].username, questions: [], image: '/tv.png', authorId: users[0]._id },
    { category: categories[2], title: 'Geography Master', author: users[1].username, questions: [], image: '/geography.png', authorId: users[1]._id },
    { category: categories[2], title: 'Rivers & Australia', author: users[1].username, questions: [], image: '/nature.png', authorId: users[1]._id },
    { category: categories[3], title: 'Music Trivia', author: users[0].username, questions: [], image: '/music.png', authorId: users[0]._id },
]

// Insert quizzes into the database
const quizzes = await QuizModel.insertMany(quizzesArray) 
console.log('All quizzes seeded successfully')

//  The questionsArray contains nested arrays. Each nested array contains 2 questions which belong to the same quiz
const questionsArray = [
    [{
        quizId: quizzes[0]._id,
        question: 'Approximately how old is the universe?',
        correctAnswer: '13.8 billion years',
        incorrectAnswers: ['10.4 billion years', '1.4 billion years', '15.2 billion years']
    },
    {
        quizId: quizzes[0]._id,
        question: 'What was the first successfully cloned mammal?',
        correctAnswer: 'A sheep',
        incorrectAnswers: ['A dog', 'A tadpole', 'A pig']
    }],
    [{
        quizId: quizzes[1]._id,
        question: 'What are human nails mostly made of?',
        correctAnswer: 'Keratin',
        incorrectAnswers: ['Collagen', 'Bone', 'Elastin']
    },
    {
        quizId: quizzes[1]._id,
        question: 'Which noble gas has the lowest atomic number?',
        correctAnswer: 'Helium',
        incorrectAnswers: ['Radon', 'Argon', 'Krypton']
    }],
    [{
        quizId: quizzes[2]._id,
        question: 'In \'Finding Nemo\', what was Nemo\'s father\'s name?',
        correctAnswer: 'Marlin',
        incorrectAnswers: ['Marley', 'Martin', 'Maxwell']
    },
    {
        quizId: quizzes[2]._id,
        question: 'Which of the following movies did Nicolas Cage not star in?',
        correctAnswer: 'The Wrestler',
        incorrectAnswers: ['The Rock', 'National Treasure', 'Ghost Rider']
    }, 
    {
        quizId: quizzes[2]._id,
        question: "What's the name of the skyscraper in Die Hard?",
        correctAnswer: "Nakatomi Plaza",
        incorrectAnswers: ["Anatomy Plaza", 'Bradbury Building', 'The Dakota']
    },
    {
        quizId: quizzes[2]._id,
        question: "The 2002 film '28 Days Later' is mainly set in which European country?",
        correctAnswer: 'United Kingdom',
        incorrectAnswers: ['France', 'Italy', 'Germany']
    }, 
    {
        quizId: quizzes[2]._id,
        question: "Darth Vader's famous reveal to Luke is iconic. But which of these is the right one?",
        correctAnswer: "'No. I am your father.'",
        incorrectAnswers: ["'Luke, I am your father.'", "'You're wrong.'", "'The truth is that I am your father.'"]
    }, 
    {
        quizId: quizzes[2]._id,
        question: "According to 'Star Wars' lore, which planet does Obi-Wan Kenobi come from?",
        correctAnswer: 'Stewjon',
        incorrectAnswers: ['Alderaan', 'Tatooine', 'Naboo']
    }],
    [{
        quizId: quizzes[3]._id,
        question: 'Which Game of Thrones star was nominated for an Emmy every season?',
        correctAnswer: 'Peter Dinklage',
        incorrectAnswers: ['Kit Harington', 'Emilia Clarke', 'Lena Headey']
    },
    {
        quizId: quizzes[3]._id,
        question: 'South Park is set in which US state?',
        correctAnswer: 'Colorado',
        incorrectAnswers: ['Utah', 'Arizona', 'Kansas']
    }],
    [{
        quizId: quizzes[4]._id,
        question: 'What is the largest country in the world?',
        correctAnswer: 'Russia',
        incorrectAnswers: ['Canada', 'China', 'The United States of America']
    },
    {
        quizId: quizzes[4]._id,
        question: 'Which of the following is not a country in Africa?',
        correctAnswer: 'Guyana',
        incorrectAnswers: ['Madagascar', 'Egypt', 'Seychelles']
    }],
    [{
        quizId: quizzes[5]._id,
        question: 'Which of these is the longest river in the world?',
        correctAnswer: 'Nile',
        incorrectAnswers: ['Amazon', 'Yangtze', 'Congo']
    },
    {
        quizId: quizzes[5]._id,
        question: 'How many states are in Australia?',
        correctAnswer: '6',
        incorrectAnswers: ['7', '8', '9']
    }],
    [{
        quizId: quizzes[6]._id,
        question: 'What singer holds the world record for most words in a hit single?',
        correctAnswer: 'Eminem',
        incorrectAnswers: ['Snoop Dogg', 'Jay-Z', '50 Cent']
    },
    {
        quizId: quizzes[6]._id,
        question: 'What was the first rock-n-roll song to hit #1 on the charts?',
        correctAnswer: 'Rock Around the Clock',
        incorrectAnswers: ['Heartbreak Hotel', 'Tutti-Fruitti', 'Whole Lotta Love']
    },
    {
        quizId: quizzes[6]._id,
        question: "Which movie features the Aerosmith song 'I Don't Wanna Miss A Thing'?",
        correctAnswer: 'Armageddon',
        incorrectAnswers: ['Pirates of the Caribbean', 'Working Girl', 'The Godfather']
    },
    {
        quizId: quizzes[6]._id,
        question: 'Which US city is often considered to be the world’s country music capital?',
        correctAnswer: 'Nashville',
        incorrectAnswers: ['Louisville', 'Houston', 'Denver']
    }]
]

// this function pushes question objects to corresponding quiz objects and saves the quizzes. To be called after the questions are inserted. 
async function pushQuestions(questions, index) {
    questions.forEach(question => {
        quizzes[index].questions.push(question._id)
    })

    await quizzes[index].save().then(() => {
        console.log('Save successfully')
    })
}

// Insert questions into the database and calling pushQuestions on the returned array
async function insertQuestions() {
    for (let i = 0; i < quizzes.length; i++) {
        const insertedQuestions = await QuestionModel.insertMany(questionsArray[i])
        // console.log(insertedQuestions)
        await pushQuestions(insertedQuestions, i)
    }
}

await insertQuestions()

dbClose()
