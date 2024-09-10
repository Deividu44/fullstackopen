import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"
import Recommend from "./components/Recommend"

const ShowError = ({ message }) => {
  if(!message) return null
  return(
    <div style={{color: 'red'}}>{ message }</div>
  )
}


const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  const login = token => {
    setToken(token)
    localStorage.setItem('library-user-token', token)
    setPage('add')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("books")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null 
        ? <button onClick={() => setPage("login")}>Login</button>
        : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>Recommendations</button>

            <button onClick={logout}>Logout</button>
          </>
        )
        }
      </div>
      <ShowError message={errorMessage} />
      <Authors show={page === "authors"} setError={notify}/>

      <Books show={page === "books"} />
      <LoginForm show={page === "login"} loginUser={login} setError={notify} />
      <Recommend show={ page === "recommend"} />
      <NewBook show={page === "add"} setError={notify} />
    </div>
  )
}

export default App
