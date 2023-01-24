import { dbClose } from './db.js'
import CategoryModel from './models/categoryModel.js'
import QuestionModel from './models/questionModel.js'
import QuizModel from './models/quizModel.js'

// Remove all entries from the database
await QuestionModel.deleteMany()
console.log('All questions deleted')
await QuizModel.deleteMany()
console.log('All quizzes deleted')
await CategoryModel.deleteMany()
console.log('All categories deleted')

// Create categories to seed
const categoriesArray = [
    { name: 'Science' },
    { name: 'TV & Movies' },
    { name: 'Geography' },
]

// Insert categories into the database
const categories = await CategoryModel.insertMany(categoriesArray)
console.log('All categories seeded successfully')

const quizzesArray = [
    { category: categories[0], questions: [] },
    { category: categories[0], questions: [] },
    { category: categories[1], questions: [] },
    { category: categories[1], questions: [] },
    { category: categories[2], questions: [] },
    { category: categories[2], questions: [] }
]

// Insert quizzes into the database
const quizzes = await QuizModel.insertMany(quizzesArray) 
console.log('All quizzes seeded successfully')

// const questionsArray = [
//     {
//         quizId: quizzes[0],
//         question: 'Approximately how old is the universe?',
//         correctAnswer: '13.8 billion years',
//         incorrectAnswers: ['10.4 billion years', '1.4 billion years', '15.2 billion years']
//     },
//     {
//         quizId: quizzes[0],
//         question: 'What was the first successfully cloned mammal?',
//         correctAnswer: 'A sheep',
//         incorrectAnswers: ['A dog', 'A tadpole', 'A pig']
//     },
//     {
//         quizId: quizzes[1],
//         question: 'What are human nails mostly made of?',
//         correctAnswer: 'Keratin',
//         incorrectAnswers: ['Collagen', 'Bone', 'Elastin']
//     },
//     {
//         quizId: quizzes[1],
//         question: 'Which noble gas has the lowest atomic number?',
//         correctAnswer: 'Helium',
//         incorrectAnswers: ['Radon', 'Argon', 'Krypton']
//     },
//     {
//         quizId: quizzes[2],
//         question: 'In \'Finding Nemo\', what was Nemo\'s father\'s name?',
//         correctAnswer: 'Marlin',
//         incorrectAnswers: ['Marley', 'Martin', 'Maxwell']
//     },
//     {
//         quizId: quizzes[2],
//         question: 'Which of the following movies did Nicolas Cage not star in?',
//         correctAnswer: 'The Wrestler',
//         incorrectAnswers: ['The Rock', 'National Treasure', 'Ghost Rider']
//     },
//     {
//         quizId: quizzes[3],
//         question: 'Which Game of Thrones star was nominated for an Emmy every season?',
//         correctAnswer: 'Peter Dinklage',
//         incorrectAnswers: ['Kit Harington', 'Emilia Clarke', 'Lena Headey']
//     },
//     {
//         quizId: quizzes[3],
//         question: 'South Park is set in which US state?',
//         correctAnswer: 'Colorado',
//         incorrectAnswers: ['Utah', 'Arizona', 'Kansas']
//     },
//     {
//         quizId: quizzes[4],
//         question: 'What is the largest country in the world?',
//         correctAnswer: 'Russia',
//         incorrectAnswers: ['Canada', 'China', 'The United States of America']
//     },
//     {
//         quizId: quizzes[4],
//         question: 'Which of the following is not a country in Africa?',
//         correctAnswer: 'Guyana',
//         incorrectAnswers: ['Madagascar', 'Egypt', 'Seychelles']
//     },
//     {
//         quizId: quizzes[5],
//         question: 'Which of these is the longest river in the world?',
//         correctAnswer: 'Nile',
//         incorrectAnswers: ['Amazon', 'Yangtze', 'Congo']
//     },
//     {
//         quizId: quizzes[5],
//         question: 'How many states are in Australia?',
//         correctAnswer: '6',
//         incorrectAnswers: ['7', '8', '9']
//     }
// ]

// // Insert questions into the database
// const questions = await QuestionModel.insertMany(questionsArray) 
// console.log('All questions seeded successfully')

//testing pushing questions into quizzes 

const questionsArrayQ0 = [
    {
        quizId: quizzes[0],
        question: 'Approximately how old is the universe?',
        correctAnswer: '13.8 billion years',
        incorrectAnswers: ['10.4 billion years', '1.4 billion years', '15.2 billion years']
    },
    {
        quizId: quizzes[0],
        question: 'What was the first successfully cloned mammal?',
        correctAnswer: 'A sheep',
        incorrectAnswers: ['A dog', 'A tadpole', 'A pig']
    }
]

const questionsArrayQ1 = [
    {
        quizId: quizzes[1],
        question: 'What are human nails mostly made of?',
        correctAnswer: 'Keratin',
        incorrectAnswers: ['Collagen', 'Bone', 'Elastin']
    },
    {
        quizId: quizzes[1],
        question: 'Which noble gas has the lowest atomic number?',
        correctAnswer: 'Helium',
        incorrectAnswers: ['Radon', 'Argon', 'Krypton']
    }
]

const questionsArrayQ2 = [
    {
        quizId: quizzes[2],
        question: 'In \'Finding Nemo\', what was Nemo\'s father\'s name?',
        correctAnswer: 'Marlin',
        incorrectAnswers: ['Marley', 'Martin', 'Maxwell']
    },
    {
        quizId: quizzes[2],
        question: 'Which of the following movies did Nicolas Cage not star in?',
        correctAnswer: 'The Wrestler',
        incorrectAnswers: ['The Rock', 'National Treasure', 'Ghost Rider']
    }
]

const questionsArrayQ3 = [    
    {
        quizId: quizzes[3],
        question: 'Which Game of Thrones star was nominated for an Emmy every season?',
        correctAnswer: 'Peter Dinklage',
        incorrectAnswers: ['Kit Harington', 'Emilia Clarke', 'Lena Headey']
    },
    {
        quizId: quizzes[3],
        question: 'South Park is set in which US state?',
        correctAnswer: 'Colorado',
        incorrectAnswers: ['Utah', 'Arizona', 'Kansas']
    }
]

const questionsArrayQ4 = [
    {
        quizId: quizzes[4],
        question: 'What is the largest country in the world?',
        correctAnswer: 'Russia',
        incorrectAnswers: ['Canada', 'China', 'The United States of America']
    },
    {
        quizId: quizzes[4],
        question: 'Which of the following is not a country in Africa?',
        correctAnswer: 'Guyana',
        incorrectAnswers: ['Madagascar', 'Egypt', 'Seychelles']
    }
]

const questionsArrayQ5 = [
    {
        quizId: quizzes[5],
        question: 'Which of these is the longest river in the world?',
        correctAnswer: 'Nile',
        incorrectAnswers: ['Amazon', 'Yangtze', 'Congo']
    },
    {
        quizId: quizzes[5],
        question: 'How many states are in Australia?',
        correctAnswer: '6',
        incorrectAnswers: ['7', '8', '9']
    }
]

// inserting questions into database
const questionsQ0 = await QuestionModel.insertMany(questionsArrayQ0) 
const questionsQ1 = await QuestionModel.insertMany(questionsArrayQ1) 
console.log('Questions seeded successfully to Quiz 0')

// pushing the questions to corresponding quiz 
// console.log(questionsQ0)
// console.log(quizzes)

async function pushQuestions(questions, index) {
    questions.forEach(question => {
        quizzes[index].questions.push(question)
    })

    await quizzes[index].save().then(() => {
        console.log('Save successfully')
    })
}

// questionsQ0.forEach(question => {
//     // quizzes[0].questions.push(question.id)
//     console.log(question.id)
// })

// await quizzes[0].save().then(() => {
//     console.log('Save successfully')
// })


await pushQuestions(questionsQ0, 0)
await pushQuestions(questionsQ1, 1)
// pushQuestions(questionsArrayQ1, 1)


// await quizzes[1].save().then(() => {
//     console.log('Save successfully')
// })
dbClose()
