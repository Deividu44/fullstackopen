const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', (req, res) => {
  Blog.find({}).then(allBlogs => res.json(allBlogs))
})

notesRouter.post('/', (req, res) => {
  const newBlog = new Blog(req.body)
  newBlog.save()
    .then(result => res.status(201).json(result))
})

module.exports = notesRouter