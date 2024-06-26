const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const apiHelper = require('../utils/apilist_helpers')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('Deleted')

  const password = await bcrypt.hash('1234', 10)

  // Add one user
  const newUser = new User({
    name: "Toad",
    username: "toad22",
    passwordHash: password
  })
  await newUser.save()

  const user = await User.find({})
  //console.log(user);
  // Add blogs
  for (const blog of apiHelper.initialBlog) {
    blog.user = user[0].id
    const blogObject = new Blog(blog)
    await blogObject.save()
    user[0].blogs = user[0].blogs.concat(blogObject._id)
    await user[0].save()
  }


})

test('Data returned is JSON', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Response with all blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, apiHelper.initialBlog.length)
})

test('Id unique of posts blogs called id', async () => {
   const blogAtStart = await apiHelper.blogsInDb()
   const idStart = blogAtStart[0].id

   const result = await api.get(`/api/blogs/${idStart}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

   assert(idStart.includes(result.body.id))
})

test('New post blog increment total length of blogs', async() => {
  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  const resultLogin = await api.post('/api/login')
          .send(loginUser)


  const newBlog = {
    title: 'Other new blog',
    author: 'My Self',
    url: 'none',
    likes: 4,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${resultLogin.body.token}`)
    .expect(201)

  const blogAtEnd = await apiHelper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, apiHelper.initialBlog.length + 1)
})


test('New post blog likes is missing value its zero', async () => {
  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  const resultLogin = await api.post('/api/login')
          .send(loginUser)

  const newBlogWithoutLikes = {
    title: 'More five woopers',
    author: 'My Self',
    url: 'none'
  }
 const result =  await api.post('/api/blogs')
  .send(newBlogWithoutLikes)
  .set('Authorization', `Bearer ${resultLogin.body.token}`)
  .expect(201)

  assert.strictEqual(result.body.likes, 0)
})


test('New post blog title field is missing', async () =>{
  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  const resultLogin = await api.post('/api/login')
          .send(loginUser)

  const newBlogWithoutTitle = {
    author: 'My Self',
    url: 'none'
  }
 const withOutTitle =  await api.post('/api/blogs')
  .send(newBlogWithoutTitle)
  .set('Authorization', `Bearer ${resultLogin.body.token}`)
  .expect(400)

  assert.strictEqual(withOutTitle.status, 400)
})


test('New post blog url field is missing', async () =>{
  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  const resultLogin = await api.post('/api/login')
          .send(loginUser)

  const newBlogWithoutUrl = {
    title: 'Missing url',
    author: 'My Self',
  }
 const withOutUrl =  await api.post('/api/blogs')
  .send(newBlogWithoutUrl)
  .set('Authorization', `Bearer ${resultLogin.body.token}`)
  .expect(400)

  assert.strictEqual(withOutUrl.status, 400)
})

test('A specific blog in database can be deletes', async () => {
  const dbAtStart = await apiHelper.blogsInDb()
  const noteToDelete = dbAtStart[0]

  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  const resultLogin = await api.post('/api/login')
          .send(loginUser)

  await api.delete(`/api/blogs/${noteToDelete.id}`)
    .set('Authorization', `Bearer ${resultLogin.body.token}`)
    .expect(204)

  const dbAtEnd = await apiHelper.blogsInDb()

  const contents =  dbAtEnd.map(n => n.title)
  assert(!contents.includes(noteToDelete.title))
  assert.strictEqual(dbAtEnd.length, apiHelper.initialBlog.length - 1)
})

test('Update likes propertie of a specific blog', async () => {
  const dbAtStart = await apiHelper.blogsInDb()
  const noteToUpdate = dbAtStart[0]

  const newBlog = {
    likes: 8
  }

  const update = await api.put(`/api/blogs/${noteToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  const dbAtEnd = await apiHelper.blogsInDb()
  const finalLikes = dbAtEnd[0].likes
  assert.strictEqual(finalLikes, 8)
})

test('Should failed without token provided', async () => {
  const loginUser = {
    username: 'toad22',
    password: '1234'
  }
  await api.post('/api/login')
          .send(loginUser)


  const newBlog = {
    title: 'Other new blog',
    author: 'My Self',
    url: 'none',
    likes: 4,
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogAtEnd = await apiHelper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, apiHelper.initialBlog.length)
})

after(async () => {
  await mongoose.connection.close()
})
