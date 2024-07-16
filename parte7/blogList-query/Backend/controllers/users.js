const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
  const allUsers = await User.find({})
    .populate('blogs', { title: 1, url: 1, likes: 1})
  res.json(allUsers)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if (Object.keys(req.body).length === 0) return res.status(400).send({ error: 'There is no data' })
  if (password.length < 3 ) return res.status(400).send({ error: 'Min length 3 for password'})

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try{
    const savedUser = await user.save()
    res.json(savedUser)
  } catch(exception) {
    next(exception)
  }

})

module.exports = usersRouter

