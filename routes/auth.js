import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import {issueJWT, comparePassword } from '../jwtUtils.js'
import {requireAuth} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/user/:id', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(401).json({ message: "Could not find user "})
    } else {
      res.json(user)
    }
  } catch (err) {
    throw new Error(err.message)
  }
})


router.post("/login", async (req, res, next) => {
  try {

    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      res.status(401).json({ message: "Could not find user "})
    }
    const isValid = comparePassword(req.body.password, user.password)

    if (isValid) {
      const tokenObject = issueJWT(user._id, user.isAdmin, user.username)
      res.json({ 
        message: "Login successfully.", 
        user: user, 
        token: tokenObject.token, 
        expiresIn: tokenObject.expires
      })

    } else {
      res.status(401).json({ message: "Invalid username or password." })
    }
  } 
  catch(err) {
    res.status(500).json({ message: err.message })
  }
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
      console.log(res)
    }
  })
})
 

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err) }
  })
  res.json({ message: 'Logout successfully' })
})


export default router