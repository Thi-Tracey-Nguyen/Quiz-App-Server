import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// function to compare password input and harshed password
function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash)
}


// funtion to create JWT
function issueJWT(user) {
  const _id = user._id
  const expiresIn = '1d'
  const payload = {
    sub: _id,
    iat: Date.now()
  }
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: "Bearer" + signedToken,
    expires: expiresIn
  }
}

export {issueJWT, comparePassword} 