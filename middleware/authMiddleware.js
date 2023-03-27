import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { parseJwt } from '../jwtUtils.js'

//access public key for jwt verification 
const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')


const requireAuth = (req, res, next) => {
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    const token = req.headers.authorization.substring(6, req.headers.authorization.length)

    jwt.verify(token, PUB_KEY, {algorithms: ['RS256']}, (err, decodedToken) => {
        if (err) {
          console.log(err.message)
        } else {
          next()
        }
      })
  }
  else {
    res.status(401).json({ message: 'Unauthorized.'})
  }
  }

  const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization.substring(6, req.headers.authorization.length)
    const userInfo = parseJwt(token).userInfo
    if (userInfo.isAdmin) {
      next()
    }
  }


export { requireAuth, verifyAdmin } 