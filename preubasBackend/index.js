require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT
const presentation = () => {
  console.log(`Server running on port ${PORT}`)
}
app.listen(PORT, presentation)

console.log('Hola que tal')
