const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (req, res) => {
  const allComments = await Comment.find({ blog: req.params.id })
  res.json(allComments)
})

commentsRouter.post('/:id/comments', async (req, res, next) => {
  const { content } = req.body
  const blog = await Blog.findById(req.params.id)

  try {
    const newComment = new Comment({
      content,
      blog: blog.id
    })

    const result = await newComment.save()
    blog.comments = blog.comments.concat(newComment._id)
    await blog.save()
    res.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter
