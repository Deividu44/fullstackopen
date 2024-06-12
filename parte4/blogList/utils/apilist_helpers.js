const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'n',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'n',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'n',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'n',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'n',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'n',
    likes: 2
  }
]

const initialUser = [
  {
    name: "Julian Lopez",
    username: "elphoka",
  },
  {
    name: "Carlos Areces",
    username: "djcafre",
  }
]

const blogsInDb = async () => {
  const allBlogs = await Blog.find({})
  return allBlogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const allUsers = await User.find({})
  return allUsers.map(user => user.toJSON())
}

module.exports = { initialBlog, initialUser, blogsInDb, usersInDb }


