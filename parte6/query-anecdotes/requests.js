import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

const createAnecdote = content => axios.post(baseUrl, content).then(res => res.data)

const updateAnecdote = anecdoteToUpdate => axios.put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate)
.then(res => res.data)
export { getAnecdotes, createAnecdote, updateAnecdote }