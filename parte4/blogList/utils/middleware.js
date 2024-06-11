const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) =>  {
  if(error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id'})
  } 
  else if(error.name === 'ValidationError') {
    const value = error.errors.title ? 'title' : 'url'
    res.status(400).send({ error: `${value} or url field is required`})
  }
  next(error)
}

module.exports = { unknownEndpoint, errorHandler }
