const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connection success')
  })
  .catch(error => {
    console.log('Connection failed: ', error.message);
    
  })



let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
    bookCount: 0
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
    bookCount: 0
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
    bookCount: 0
  },
  {
    name: 'Joshua Kerievsky',
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    bookCount: 0
  },
  {
    name: 'Sandi Metz',
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    bookCount: 0
  }
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
]

const typeDefs = `#graphql
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!) :Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

      const books = await Book.find({})
      if (args.genre) return await Book.find({ genres:  args.genre  })
      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (_, __, context) => context.currentUser
  },

  Author: {
    bookCount: root => {
     return books.filter(b => b.author === String(root.name)).length
      
    }
  },

  Book: {
    author: async root => {
      const foundAuthor = await Author.find({ _id: root.author })
      const { name, born } = foundAuthor[0]

      return {
        name,
        born
      }
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      
      const { currentUser }  = context

      if (!currentUser) throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
      if(args.title.length < 2) throw new GraphQLError('Title field minimum 2', {
         extensions: { 
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title
         }})

     if(args.author.length < 4) throw new GraphQLError('Author field minimum 4', {
      extensions: { 
           code: 'BAD_USER_INPUT',
           invalidArgs: args.author
          }})

      const existAuthor = await Author.findOne({ name: args.author})

      if (!existAuthor) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
            throw new GraphQLError('saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          }
      }

      const findAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: findAuthor })

      try {
        await book.save()
      } catch(error) {
          throw new GraphQLError('')
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })

      const author = await Author.findOne({ name: args.name })
      if(!author) {
        throw new GraphQLError('Author\'s name doesnt\'s  exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args
          }
        })
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
          throw new GraphQLError('saving author birth failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args
            }
          })
        }
      return author
    },
    createUser: async (_, args) => {      
      const user = new User({ username: args.username })

      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
    },
    login: async (_, args) => {
      const foundUser = await User.findOne({ username: args.username })
      if(!foundUser || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      const userForToken = {
        username: foundUser.username,
        id: foundUser._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

