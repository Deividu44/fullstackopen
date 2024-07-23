import { useState } from 'react'
import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNofitication } from '../reducers/notificationReducer'
import { login } from '../reducers/authReducer'
import { Form, Button } from 'react-bootstrap'

function FormLogin () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitUser = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  const handleLogin = async (userObject) => {
    try {
      dispatch(login(userObject))
      navigate('/blogs')
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  return (
    <Togglable buttonLabel='Log in'>
      <h2>Login</h2>
      <Form onSubmit={submitUser}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button style={{ marginTop: '2 em' }} id='login-button' type='submit'>
          Login
        </Button>
      </Form>
    </Togglable>
  )
}

export default FormLogin
