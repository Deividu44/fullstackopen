import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

const App = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => {
        return a.id === updatedAnecdote.id ? updatedAnecdote : a
      }))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const addAnecdote = (content) => {
    const anecObj = {
      content, votes: 0
    } 
    newAnecdoteMutation.mutate(anecObj)
  }

  const {isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if(isPending) {
    return <div>Loading data...</div>
  }

  if(isError) {
    return <div>Anecdote service not available due to problems</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
