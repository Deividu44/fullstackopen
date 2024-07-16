const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const apiHelper = require('../utils/apilist_helpers')
const app = require('../app')
const api = supertest(app)

describe('When there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    console.log('Deleted')
    const passwordHash = await bcrypt.hash('1234', 10)
    for (const user of apiHelper.initialUser) {
      user.passwordHash = passwordHash
      const userObject = new User(user)
      await userObject.save()
    }
  })

  test('Users are returned in JSON ', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should not create user with username invalid ', async () => {

    const userNameShort = {
      name: "Raul Cimas",
      username: "mc",
      password: "1234"
    }
    await api.post('/api/users')
      .send(userNameShort)
      .expect(400)
      .expect({ error: 'username too short min 3 characters' })


    const dbAtEnd = await apiHelper.usersInDb()
    assert.strictEqual(dbAtEnd.length, apiHelper.initialUser.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})