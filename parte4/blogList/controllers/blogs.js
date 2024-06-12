const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


notesRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  res.json(allBlogs)
})

notesRouter.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const blog = await Blog.findById(id)

    if(blog) {
      res.json(blog)
    } else{
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
}) 

notesRouter.post('/', async (req, res, next) => {
  const {title, author, url, likes} = req.body
  try{
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) return res.status(401).json({ error: 'Token invalid' })

    const user = await User.findById(decodedToken.id)
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id
    })

    const result = await newBlog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(201).json(result)
    
  } catch(exception) {
    next(exception)
  }

})

notesRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res) => {
  const { body, params } = req

  const updatedBlog = await Blog.findByIdAndUpdate(
    params.id,
    body,
    {new: true, runValidators: true, context: 'query'})
    
  res.json(updatedBlog)
  console.log(body, params.id)
})

module.exports = notesRouter
