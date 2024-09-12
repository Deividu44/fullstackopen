const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt  = require('jsonwebtoken')

const pubsub = new PubSub()

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
    bookCount: async root => {
      const res = await Book.find({ author: root._id })      
      return res.length      
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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
            invalidArgs: args
          }
        })
      }

      const userForToken = {
        username: foundUser.username,
        id: foundUser._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}

    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers