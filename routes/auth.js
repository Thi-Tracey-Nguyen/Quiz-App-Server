import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import {issueJWT} from '../jwtUtils.js'

const router = express.Router()

// routes
// router.get('/', (req, res) => {
//   const user = req.user || { name: 'Guest' }
//   res.render('index.ejs', { name: user.name })
// })

router.get('/user/:id', checkAuthenticated, async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        res.send(user)
      } else {
        res.status(404).send({ error: 'User not found!' }) // catch error when Id is valid but does not exist in db
      }
    } catch (err) {
      console.log({ error: err.message })
    }
  } else {
    res.status(500).send({ error: 'Invalid Id!' })
  }
})

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login', 
//   failureFlash: true
// }))

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Could not find user "})
      }
      // const isValid = 
    })
})

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err
    if (doc) res.status(409).json({ message: "User Already Exists" })
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      const user = await newUser.save()

      const jwt = issueJWT(user)

      res.status(201).json({message: "User Created", user: user, token: jwt.token, expiresIn: jwt.expires})
    }
  })
})
 
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err) }
  })
  res.json({ message: 'Logout successfully' })
})

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

export default router