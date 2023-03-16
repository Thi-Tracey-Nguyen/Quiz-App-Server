import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
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

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login', 
//   failureFlash: true
// }))

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.json({ message: 'Username or password incorrect' });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
})
  (req, res, next)
})

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/login')
// }

router.delete('/logout', (req, res, next) => {
  req.logOut(err => {
    if (err) return next(err)
    res.redirect('/login')
  })
})

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

export default router