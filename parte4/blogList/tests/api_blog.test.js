const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const apiHelper = require('../utils/apilist_helpers')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Deleted')
  for (const blog of apiHelper.initialBlog) {
    const blogObject = new Blog(blog)
    await blogObject.save()
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
  const newBlog = {
    title: 'Other new blog',
    author: 'My Self',
    url: 'none',
    likes: 4
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogAtEnd = await apiHelper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, apiHelper.initialBlog.length + 1)
})

test('New post blog likes is missing value its zero', async () => {
  const newBlogWithoutLikes = {
    title: 'More five woopers',
    author: 'My Self',
    url: 'none'
  }
 const result =  await api.post('/api/blogs')
  .send(newBlogWithoutLikes)
  .expect(201)

  assert.strictEqual(result.body.likes, 0)
})

test('New post blog title field is missing', async () =>{
  const newBlogWithoutTitle = {
    author: 'My Self',
    url: 'none'
  }
 const withOutTitle =  await api.post('/api/blogs')
  .send(newBlogWithoutTitle)
  .expect(400)

  assert.strictEqual(withOutTitle.status, 400)
})

test('New post blog url field is missing', async () =>{
  const newBlogWithoutUrl = {
    title: 'Missing url',
    author: 'My Self',
  }
 const withOutUrl =  await api.post('/api/blogs')
  .send(newBlogWithoutUrl)
  .expect(400)

  assert.strictEqual(withOutUrl.status, 400)
})

test('A specific blog in database can be deletes', async () => {
  const dbAtStart = await apiHelper.blogsInDb()
  const noteToDelete = dbAtStart[0]

  await api.delete(`/api/blogs/${noteToDelete.id}`)
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

after(async () => {
  await mongoose.connection.close()
})
