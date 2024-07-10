import { useState } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/NewAnecdote'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setAnecdotes(anecdotes.concat(anecdote))

    setTimeout(() => {
      setNotification(null)
    },2000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification ? <h1 >{notification}</h1> : null}
      <Menu />

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew}/>}/>
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
