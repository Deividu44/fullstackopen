import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommend from "./components/Recommend"
import { 
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "../queries"

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

  const updateCacheWith = addedBook => {
    const includeIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if ( !includeIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.addedBook
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
      console.log(data)  
    }
  })

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
