import { useEffect, useState } from 'react';
import blogService from './services/blogs'
import loginService from './services/login.js'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin.jsx'
import FormBlog from './components/FormBlog.jsx'

function App() {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [objectBlog, setObjectBlog] = useState({})
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const hasBlogs = allBlogs.length !== 0;

  useEffect(() => {
    blogService.getAll().then((initialBlog) => setAllBlogs(initialBlog))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const hanldeObjectBlog = (e) => {
    setObjectBlog({ ...objectBlog, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {}
  }

  const addBlog = async (e) => {
    e.preventDefault()
    const result = await blogService.create(objectBlog)
    console.log(result)

  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  };
  return (
    <div>
      <h2>Login</h2>

      {user === null ? (
        <>
          <FormLogin
            handleLogin={handleLogin}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </>
      ) : (
        <>
          <div>
            Welcome {user?.username}
            <button onClick={() => logout()}>Logout</button>
          </div>

          <FormBlog
            addBlog={addBlog}
            objectBlog={objectBlog}
            hanldeObjectBlog={hanldeObjectBlog}
          />
        </>
      )}

      <h2>Blogs</h2>
      <ul>
        {hasBlogs ? (
          allBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        ) : (
          <h2>There are not blogs posted for the moment </h2>
        )}
      </ul>
    </div>
  );
}

export default App
