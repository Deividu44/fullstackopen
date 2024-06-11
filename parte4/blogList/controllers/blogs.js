const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({})
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
  try{
    const newBlog = new Blog(req.body)

    const result = await newBlog.save()
    res.status(201).json(result)
    
  } catch(exception) {
    next(exception)
  }

})

module.exports = notesRouter
