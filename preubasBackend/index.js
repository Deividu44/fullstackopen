const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  },
  {
    id: 6,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
// GET
app.get('/', (req, res) => {
  res.send('<h1>Hello there</h1>')
})

app.get('/api/notes', (req, res) => {
  console.log(req.headers)
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => {
    return n.id === id
  })
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
  console.log(note)
})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

// POST
app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({
      error: 'Content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }

  notes.concat(note)
  res.json(note)
  console.log(notes)
})

const PORT = 4001
const presentation = () => {
  console.log(`Server running on port ${PORT}`)
}
app.listen(PORT, presentation)

console.log('Hola que tal')
