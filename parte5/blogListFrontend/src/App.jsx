import { useEffect, useState, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin.jsx'
import FormBlog from './components/FormBlog.jsx'
import Togglable from './components/Togglable.jsx'
import Notification from './components/Notification.jsx'
import './App.css'


function App() {
  const [allBlogs, setAllBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [sort, setSort] = useState(false)
  const blogFormRef = useRef()

  const hasBlogs = allBlogs.length !== 0

  const sortedBlogsByLikes = () => {
    const copyAllBlogs = [...allBlogs]
    const compare = (a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    }
    return copyAllBlogs.sort(compare)
  }

  const sortedBlogs = sort 
  ? sortedBlogsByLikes()
  : allBlogs

  useEffect(() => {
    const getBlogs = async () => {
      const initialBlog = await blogService.getAll()
      setAllBlogs(initialBlog)
    }
    getBlogs()
  }, [])

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
    const msg = `A new blog ${result.title} by ${result.author} added`
    timeOutNoti(msg, 'success')
  } catch(error) {
    timeOutNoti(error.response.data.error, 'error')
    logout()
  }
}

const handleDelete = async id => {
  try {
    await blogService.remove(id)
    const msg = 'Blog has been removed'
    timeOutNoti(msg, 'success')
  } catch (error) {
    console.log(error)
  }
}

const updateLikes = async objectBlog => {
  const {title, author, likes, url, user}  = objectBlog
  const objectToUpdate = {
    title,
    author,
    likes: likes +1,
    url,
    user: user.id
  }
  try{
  await blogService.update(objectToUpdate, objectBlog.id)
  } catch(error) {
    timeOutNoti(error.response.data.error, 'error')
  }
}

  const timeOutNoti = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      {notification !== null &&
        <Notification message={notification}/>
      }
      {user === null ? (
        <Togglable buttonLabel='Log in'>
          <FormLogin handleLogin={handleLogin} />
        </Togglable>
      ) : (
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
      <ul>
        {hasBlogs 
        ? (
          sortedBlogs.map((blog) => <Blog 
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
  )
}

export default App
