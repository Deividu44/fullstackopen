import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"


const ShowError = ({ message }) => {
  if(!message) return null
  return(
    <div style={{color: 'red'}}>{ message }</div>
  )
}


const App = () => {
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <ShowError message={errorMessage} />
      <Authors show={page === "authors"} setError={notify}/>

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  )
}

export default App
