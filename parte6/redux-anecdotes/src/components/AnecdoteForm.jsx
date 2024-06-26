import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

function AnecdoteForm () {
  const dispatch = useDispatch()

  const newAnecdote = async e => {
    e.preventDefault()
    dispatch(createAnecdote(e.target.content.value))
    dispatch(setNotification(`New anecdote ${e.target.content.value}`, 5))
    e.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
