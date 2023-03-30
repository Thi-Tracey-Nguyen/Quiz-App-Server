import fs from 'fs'
import path from 'path'
// import { Strategy } from 'passport-local'
import jwt from 'passport-jwt'
import User from './models/userModel.js'

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')

const options = {}

options.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = PUB_KEY
options.algorithm = ['RS256']


function config(passport) {
  passport.use(
    new JwtStrategy((options, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
      }) 
      
}))
)}

export default config

