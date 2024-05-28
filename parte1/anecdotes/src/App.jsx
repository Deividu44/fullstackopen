import { useState } from 'react'
import './App.css'

function MostVoted ({ topVote }) {
  if (topVote.anecdote !== ''.trim()) {
    return (
      <div className='container'>
        <h1>Anecdote with most votes</h1>
        <p>{topVote.anecdote}</p>
        <p>Has {topVote.votes} votes</p>
      </div>
    )
  }
}

function AnecdoteVote ({ anecdotes, selected, handleNextAnecdote, handleVote }) {
  return (
    <div className='container'>
      <h1>Anecdotes of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <div className='containerButtons'>
        <button onClick={handleVote}>👍 Vote</button>
        <button onClick={handleNextAnecdote}>Next anecdote</button>
      </div>
    </div>
  )
}

function App () {
  const [selected, setSelected] = useState(0)
  const [topVote, setTopVote] = useState({
    anecdote: '',
    votes: 0
  })

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percen of the development time... The remaining 10 percent of the code account for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers wite code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debuggin is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosign pacients.',
    'The only way to go fast, is to go well.'
  ]

  const handleNextAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length)
    console.log(newAnecdote, 'Anecdota')
    setSelected(newAnecdote)
  }

  const handleVote = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    setVotes(newVotes)
    checkVotes(newVotes)
  }

  const checkVotes = (votes) => {
    let maxVote = 0
    for (const vote in votes) {
      if (votes[vote] > maxVote) maxVote = votes[vote]
    }
    const maximo = Object.values(votes).findIndex(vote => vote === maxVote)
    const newTopVote = {
      anecdote: anecdotes[maximo],
      votes: votes[maximo]
    }
    setTopVote(newTopVote)
  }

  return (
    <>
      <AnecdoteVote
        anecdotes={anecdotes}
        selected={selected}
        handleNextAnecdote={handleNextAnecdote}
        handleVote={handleVote}
      />
      <MostVoted
        topVote={topVote}
      />
    </>

  )
}

export default App
