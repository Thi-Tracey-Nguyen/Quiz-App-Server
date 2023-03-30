import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// const PRIV_KEY = process.env.PRIV_KEY

// function to compare password input and harshed password
function comparePassword(plainText, hash) {
  return bcrypt.compareSync(plainText, hash)
}


// funtion to create JWT
function issueJWT(id, isAdmin) {
  const expiresIn = '1d'
  const payload = {
    userInfo: {
      id: id,
      isAdmin: isAdmin
    },
    iat: Date.now()
  }
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: "Bearer" + signedToken,
    expires: expiresIn
  }
}

function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


export {issueJWT, comparePassword, parseJwt }