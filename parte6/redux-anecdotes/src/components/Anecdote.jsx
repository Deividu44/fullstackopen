
function Anecdote ({ anecdote, handleClick }) {
  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleClick(anecdote.id)}>vote</button>
    </div>
  </div>
  )
}

export default Anecdote
