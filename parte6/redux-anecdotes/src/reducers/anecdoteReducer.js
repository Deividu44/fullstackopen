import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },

    incrementVote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      let newVotes = anecdoteToChange.votes
      newVotes++
      console.log(newVotes)
      const changedAnecodte = {
        ...anecdoteToChange,
        votes: newVotes
      }
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : changedAnecodte
      )
    },

    setNote: (state, action) => {
      return action.payload
    }
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setNote(anecdotes))
  }
}

export const createAnecdote = newAnecdote => {
  return async dispatch => {
    const responseAnecdote = await anecdoteService.createNew(newAnecdote)
    dispatch(appendAnecdote(responseAnecdote))
  }
}

export const updateVote = (anecdoteToUpdate, id) => {
  return async dispatch => {
    await anecdoteService.update(anecdoteToUpdate, id)
    dispatch(incrementVote(id))
  }
}

export default anecdoteSlice.reducer
export const { appendAnecdote, incrementVote, setNote } = anecdoteSlice.actions
