import { useEffect, useState, useRef, useContext } from 'react'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin.jsx'
import FormBlog from './components/FormBlog.jsx'
import Togglable from './components/Togglable.jsx'
import Notification from './components/Notification.jsx'
import './App.css'
import NotificationContext from './contexts/notificationContext.jsx'
import { useMutation, useQuery } from '@tanstack/react-query'

function App () {
  const [allBlogs, setAllBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [sort, setSort] = useState(false)
  const blogFormRef = useRef()
  const [notifi, dispatch] = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
  })

  // const newBlogMutation = useMutation({ mutationFn: blogService.create })

  const blogs = result.data
  console.log(blogs)

  const hasBlogs = blogs.length !== 0

  const sortedBlogsByLikes = () => {
    const copyAllBlogs = [...blogs]
    const compare = (a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    }
    return copyAllBlogs.sort(compare)
  }

  const sortedBlogs = sort
    ? sortedBlogsByLikes()
    : blogs

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      timeOutNoti(error.response.data.error, 'error')
    }
  }

  const handleBlog = async objectBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.create(objectBlog)
      // newBlogMutation.mutate({ result })
      setAllBlogs(allBlogs.concat(result))
      const msg = `A new blog ${result.title} by ${result.author} added`
      timeOutNoti(msg, 'success')
    } catch (error) {
      timeOutNoti(error.response.data.error, 'error')
    }
  }

  const handleDelete = async id => {
    try {
      await blogService.remove(id)
      const copyAllBlogs = allBlogs.filter(blog => blog.id !== id)
      setAllBlogs(copyAllBlogs)
      const msg = 'Blog has been removed'
      timeOutNoti(msg, 'success')
    } catch (error) {
      console.log(error)
    }
  }

  const updateLikes = async objectBlog => {
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
      // Actualizar state allBlogs
      const copyAllBlogs = [...allBlogs]
      const blogToUpdate = copyAllBlogs.findIndex(blog => blog.title === title)
      copyAllBlogs[blogToUpdate].likes++
      setAllBlogs(copyAllBlogs)
    } catch (error) {
      timeOutNoti(error.response.data.error, 'error')
    }
  }

  const timeOutNoti = (message, notificationType) => {
    dispatch({ type: 'showNotification', payload: { notificationType, message } })

    setTimeout(() => {
      dispatch({ type: 'none' })
    }, 2000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      {notifi !== null &&
        <Notification message={notifi} />}
      {user === null
        ? <FormLogin handleLogin={handleLogin} />

        : (
          <Togglable buttonLabel='New note' ref={blogFormRef}>
            <div>
              Welcome {user?.username}
              <button onClick={() => logout()}>Logout</button>
            </div>
            <FormBlog addBlog={handleBlog} />
          </Togglable>
        )}

      <h2>Blogs</h2>
      <input type='checkbox' onClick={() => setSort(!sort)} /> Sort by likes
      <div id='blogs-container'>
        <ul>
          {hasBlogs
            ? (
              sortedBlogs.map(blog => <Blog
                key={blog.id}
                blog={blog}
                handleLike={updateLikes}
                handleDelete={handleDelete}
                actualUser={user?.name}
              />)
            )
            : (
              <h2>There are not blogs posted for the moment </h2>
            )}
        </ul>

      </div>

    </div>
  )
}

export default App
