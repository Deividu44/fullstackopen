import FormLogin from './components/FormLogin.jsx'
import ListOfBlogs from './components/ListOfBlogs.jsx'
import Notification from './components/Notification.jsx'
import WelcomeUser from './components/WelcomeUser.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNofitication } from './reducers/notificationReducer.js'
import { initialBlogs } from './reducers/blogReducer.js'
import { initialUser, login } from './reducers/authReducer.js'
import './App.css'

function App () {
  const user = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
  }, [])

  const handleLogin = async (userObject) => {
    try {
      dispatch(login(userObject))
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification />
      {
        user === null
          ? <FormLogin handleLogin={handleLogin} />
          : <WelcomeUser />
      }
      <ListOfBlogs />
    </div>
  )
}

export default App
