import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../../queries"

function LoginForm ({ show, loginUser, setError }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: error => {
      console.log(error)
      
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      loginUser(token)
    }
  }, [result.data])

  const submit = e => {
    e.preventDefault()
    login({ variables: { username, password }})
    setUsername('')
    setPassword('')
  }

  if(!show) return null

  return (
    <div>
      <h2>He aqui un formulario de Login </h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm