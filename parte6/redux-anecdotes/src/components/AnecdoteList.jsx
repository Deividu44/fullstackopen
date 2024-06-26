import { useDispatch, useSelector } from "react-redux"
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"


function AnecdoteList() {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log({ anecdotes, filter })
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))    
  })

  const sortedAnecdoteByVotes = () => {
    
    const compare = (a, b) => {
      if (a.votes < b.votes) return 1
      if (a.votes > b.votes) return -1
      return 0
    }
    return [...anecdotes].sort(compare)
  }

  const vote = objectAnecdote => {
    const { id, votes } = objectAnecdote
    const updateAnecdote = {...objectAnecdote, votes: votes + 1 }
    dispatch(updateVote(updateAnecdote, id))
    dispatch(setNotification(`You voted ${objectAnecdote.content}`, 5))
  }

  const sortedAnecdotes = sortedAnecdoteByVotes()

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}/>
      )}
    </>
  )
}

export default AnecdoteList
