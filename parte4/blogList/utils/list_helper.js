const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = listOfBlogs => {
  const likes = listOfBlogs.map(blog => {
    return blog.likes
  })

  const reducer = (sum, item) => {
    return sum + item
  }

  return listOfBlogs.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = listOfBlogs => {
  if (listOfBlogs.length <= 1) return listOfBlogs
  let mostLikes = { likes: 0 }

  _.map(listOfBlogs, blog => {
    mostLikes = mostLikes.likes < blog.likes ? blog : mostLikes
  })

  return mostLikes
}

const likesOrBlogs = (listOfBlogs, value) => {
  const listOfAuthors = []
  let maxValue = 0

  _.forEach(listOfBlogs, blog => {
    if (_.find(listOfAuthors, b => b.author === blog.author)) {
      const i = _.findIndex(listOfAuthors, b => b.author === blog.author)
      if (value === 'likes') {
        listOfAuthors[i][value] += blog.likes
      } else {
        listOfAuthors[i][value]++
      }
    } else {
      if (value === 'likes') {
        listOfAuthors.push({ author: blog.author, [value]: blog.likes })
      } else {
        listOfAuthors.push({ author: blog.author, [value]: 1 })
      }
    }
  })

  _.map(listOfAuthors, blogger => {
    const num = blogger[value]
    maxValue = _.max([maxValue, num])
  })
  return _.find(listOfAuthors, b => b[value] === maxValue)
}

const mostBlogs = listOfBlogs => {
  return listOfBlogs.length <= 1
    ? listOfBlogs
    : likesOrBlogs(listOfBlogs, 'blogs')
}

const mostLikes = listOfBlogs => {
  return listOfBlogs.length <= 1
    ? listOfBlogs
    : likesOrBlogs(listOfBlogs, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
