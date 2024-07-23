import FormLogin from './components/FormLogin.jsx'
import ListOfBlogs from './components/ListOfBlogs.jsx'
import Notification from './components/Notification.jsx'
import WelcomeUser from './components/WelcomeUser.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer.js'
import { initialUser } from './reducers/authReducer.js'
import { Routes, Route, Navigate } from 'react-router-dom'
import ListOfUsers from './components/ListOfUsers.jsx'
import User from './components/User.jsx'
import Blog from './components/Blog.jsx'
import './App.css'

function App () {
  const user = useSelector(({ auth }) => auth)
  const listUsers = useSelector(({ users }) => users)
  const listBlogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
  }, [])

  return (
    <div className='container'>
      <div>
        <h1>Blog List Application</h1>
        <Notification />
        {
          user === null
            ? <FormLogin />
            : <WelcomeUser />
        }
      </div>

      <Routes>
        <Route path='/users' element={<ListOfUsers />} />
        <Route path='/users/:id' element={<User users={listUsers} />} />
        <Route path='/blogs' element={<ListOfBlogs />} />
        <Route path='/blogs/:id' element={<Blog blogs={listBlogs} />} />
        <Route paht='/login' element={user ? <Navigate replace to='/blogs' /> : <FormLogin />} />
      </Routes>
    </div>
  )
}

export default App
