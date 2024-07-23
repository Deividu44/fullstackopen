const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  res.json(allBlogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await Blog.findById(id)

    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  try {
    const user = await req.user
    if (!user) return res.status(401).json({ error: 'Token invalid' })

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
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    const user = req.user

    if (!user) return res.status(401).json({ error: 'Token invalid' })
    if (blog.user.toString() === user.id) {
      user.blogs = user.blogs.filter(b => b._id.toString() !== req.params.id)
      await user.save()
      await Blog.findByIdAndDelete(req.params.id)
      return res.status(204).end()
    }
    return res.status(401).json({ error: 'User invalid' })
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const { body, params, user } = req

    if (!user) return res.status(401).json({ error: 'Token invalid' })
    console.log(user)

    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true, context: 'query' })

    return res.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
