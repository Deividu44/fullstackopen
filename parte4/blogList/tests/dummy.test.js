const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs= require('./blogsTest') // list of many blogs

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }
]

test('Dummy returns one', () => {

  const result = listHelper.dummy([])

  assert.strictEqual(result, 1)
})

describe('Total likes', () => {


  test('Of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('When list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('Of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('Facvorite Blog', () => {  

  test('Of empty list is zero', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepEqual(result, [])
  })

  test('When list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepEqual(result, listWithOneBlog)
  })

  test('Of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    assert.deepEqual(result, expected)
  })
})

describe('Most blogs', () => {

  test('When list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepEqual(result, listWithOneBlog)
  })

  test('Of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    assert.deepEqual(result, expected)
  })
  
})

describe('Most likes', () => {
  
  test('Of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    assert.deepEqual(result, expected)
  })

  test('There are two authors with equals likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    assert.deepEqual(result, expected)
  })

})



