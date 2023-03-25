import fs from 'fs'
import path from 'path'
import { Strategy } from 'passport-local'
import jwt from 'passport-jwt'
import bcrypt from 'bcrypt'
import User from './models/userModel.js'

// const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithm: ['RS256']
}

export default function initialize(passport) {
  passport.use(
    new Strategy((options, (payload, done) => {
      User.findOne({ _id: payload.sub }) 
        .then((user) => {
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
      })
        .catch(err => done(err,null)
    )}
    ))
)}