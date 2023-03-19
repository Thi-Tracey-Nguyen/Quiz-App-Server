import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import mongoose from 'mongoose'
import initializePassport from '../passport-config.js'
import session from 'express-session'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

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
  passport.authenticate("local", (err, user) => {
    if (err) throw err
    if (!user) res.status(401).send({ message: 'Username or password incorrect' })
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send(user)

        //send session info back 
        const session = req.session
        session.isAuthenticated = true
        res.send(req.session._id)
      })
      
    }
})
  (req, res, next)
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
      await newUser.save();
      res.status(201).json({message: "User Created"})
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