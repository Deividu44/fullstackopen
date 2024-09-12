const { ApolloServer } = require('@apollo/server')
const cors = require('cors')
const express = require('express')
const { expressMiddleware } = require('@apollo/server/express4')
const http = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const User = require('./models/User')
const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connection success')
  })
  .catch(error => {
    console.log('Connection failed: ', error.message)
  })

  
const start = async () => {
  const app = express()

  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })


  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const serverCleanup = useServer({ schema }, wsServer)

  await server.start()

  app.use('/', cors(), express.json(), expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if(auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  }))

  const PORT = 4000
  httpServer.listen(PORT, () => 
    console.log(`Server is running on http://localhost:${PORT}`)
  )
}

start()
