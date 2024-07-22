import FormLogin from './components/FormLogin.jsx'
import ListOfBlogs from './components/ListOfBlogs.jsx'
import Notification from './components/Notification.jsx'
import WelcomeUser from './components/WelcomeUser.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNofitication } from './reducers/notificationReducer.js'
import { initialBlogs } from './reducers/blogReducer.js'
import { initialUser, login } from './reducers/authReducer.js'
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'
import './App.css'
import ListOfUsers from './components/ListOfUsers.jsx'
import User from './components/User.jsx'
import Blog from './components/Blog.jsx'

function App () {
  const user = useSelector(({ auth }) => auth)
  const listUsers = useSelector(({ users }) => users)
  const listBlogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
  }, [])

  const handleLogin = async (userObject) => {
    try {
      dispatch(login(userObject))
      navigate('/blogs')
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  return (
    <>
      <div>
        <h1>Blog List Application</h1>
        <Notification />

        {
          user === null
            ? <FormLogin handleLogin={handleLogin} />
            : <WelcomeUser />
        }
      </div>

      <Routes>
        <Route path='/users' element={<ListOfUsers />} />
        <Route path='/users/:id' element={<User users={listUsers} />} />
        <Route path='/blogs' element={<ListOfBlogs />} />
        <Route path='/blogs/:id' element={<Blog blogs={listBlogs} />} />
        <Route paht='/login' element={user ? <ListOfBlogs /> : <Navigate replace to='/login' />} />
      </Routes>
    </>
  )
}

export default App
