import { useState } from "react"

function FormLogin ({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitUser = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  } 
  
  return (
    <form onSubmit={submitUser}>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input 
            type='text'
            value={username}
            onChange={({ target })=> setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input 
            type='password'
            value={password}
            onChange={({ target })=> setPassword(target.value)}
          />
          </label>
      </div>
    <button type='submit'>Login</button>
  </form>
  )
}

export default FormLogin
