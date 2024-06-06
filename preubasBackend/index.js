const express = require('express')
require('dotenv').config()
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.json())
app.use(cors())

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id'})
  } else if(error.name === 'ValidationError') return res.status(400).send({ error: error.message})
    next(error)
}

// GET
app.get('/', (req, res) => {
  res.send('<h1>Hello there</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
   Note.findById(req.params.id).then(note => {
    if(note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id)
  .then(result => res.status(204).end())
  .catch(error => next(error))
})

// POST
app.post('/api/notes', (req, res, next) => {
  const body = req.body


  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false
  })

  note.save()
  .then(savedNote => {
    res.json(savedNote)
  })
  .catch(error => next(error))
})

// PUT
app.put('/api/notes/:id', (req, res, next) => {
  const {content, important} = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query'})
  .then(updatedNote => res.json(updatedNote))
  .catch(error => next(error))
})

const PORT = process.env.PORT
const presentation = () => {
  console.log(`Server running on port ${PORT}`)
}
app.listen(PORT, presentation)
app.use(errorHandler)

console.log('Hola que tal')
