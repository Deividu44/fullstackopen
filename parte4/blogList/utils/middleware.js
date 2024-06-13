const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) =>  {
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id'})
  } 
  else if (error.name === 'ValidationError') {
    const field = getPropertieName(error.errors) 
    if (field.kind === 'required') {
      return res.status(400).send({ error: `${field.path} field is required` })
    } else if(field.kind === 'minlength') {
      return res.status(400).send({ error: `${field.path} too short min 3 characters` })
    }
  }

  else if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(400).send({ error: 'Expected username to be unique'})
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'Token expired'})
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
    return next()
  }
  req.token = null
  return next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token){
    req.user = null
    return next()
  }
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (decodedToken) {
      req.user = await User.findById(decodedToken.id)
      return next()
    } 
    req.user = null
    return next()
  } catch(exception){
    next(exception)
  }
}

const getPropertieName = errorObject => {
  for(let e in errorObject) {
    return errorObject[e]
  }
}

module.exports = { 
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
 }
