import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch } from 'react-redux'
import './App.css'
import { setNofitication } from './reducers/notificationReducer.js'
import WelcomeUser from './components/WelcomeUser.jsx'
import { useUser } from './hooks/index.js'

function App () {
  const [allBlogs, setAllBlogs] = useState([])
  const user = useUser()
  const [sort, setSort] = useState(false)
  const dispatch = useDispatch()

  const hasBlogs = allBlogs.length !== 0

  const sortedBlogsByLikes = () => {
    const compare = (a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    }
    return [...allBlogs].sort(compare)
  }

  const sortedBlogs = sort ? sortedBlogsByLikes() : allBlogs

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      user.logUser(userLogged)
      blogService.setToken(userLogged.token)
    }

    const getBlogs = async () => {
      const initialBlog = await blogService.getAll()
      setAllBlogs(initialBlog)
    }

    getBlogs()
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const userLogin = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLogin))
      blogService.setToken(userLogin.token)
      user.logUser(userLogin)
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  const handleBlog = async (objectBlog) => {
    try {
      const result = await blogService.create(objectBlog)
      setAllBlogs(allBlogs.concat(result))
      const notiObject = {
        message: `A new blog ${result.title} by ${result.author}  added`,
        type: 'success'
      }
      dispatch(setNofitication(notiObject))
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      const copyAllBlogs = allBlogs.filter((blog) => blog.id !== id)
      setAllBlogs(copyAllBlogs)
      const notiObject = { message: 'Blog has been removed', type: 'success' }
      dispatch(setNofitication(notiObject))
    } catch (error) {
      console.log(error)
    }
  }

  const updateLikes = async (objectBlog) => {
    const { title, author, likes, url, user } = objectBlog
    const objectToUpdate = {
      title,
      author,
      likes: likes + 1,
      url,
      user: user.id
    }
    try {
      await blogService.update(objectToUpdate, objectBlog.id)
      const copyAllBlogs = [...allBlogs]
      const blogToUpdate = copyAllBlogs.findIndex(
        (blog) => blog.title === title
      )
      copyAllBlogs[blogToUpdate].likes++
      setAllBlogs(copyAllBlogs)
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification />
      {
        user.value === null
          ? <FormLogin handleLogin={handleLogin} />
          : <WelcomeUser handleBlog={handleBlog} user={user.value} logout={user.logout} />
      }
      <h2>Blogs</h2>
      <input type='checkbox' onClick={() => setSort(!sort)} /> Sort by likes
      <div id='blogs-container'>
        <ul>
          {hasBlogs
            ? sortedBlogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={updateLikes}
                handleDelete={handleDelete}
                actualUser={user.value?.name}
              />
            ))

            : <h2>There are not blogs posted for the moment </h2>}
        </ul>
      </div>
    </div>
  )
}

export default App
