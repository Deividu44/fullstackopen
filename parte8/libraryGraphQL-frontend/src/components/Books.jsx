import { useQuery } from "@apollo/client"
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../../queries"
import { useState } from "react"

const Books = ({ show }) => {
  const [filter, setFilter] = useState('allBooks')
  let books
  
  if(filter !== 'allBooks') {
    const { data } = useQuery(BOOKS_BY_GENRE, { variables: { genre: filter}})
    books = data?.allBooks
  } else {
    const { data } = useQuery(ALL_BOOKS)
    books = data?.allBooks
  }  

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <h3>In genre {filter}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul>
          <button onClick={() => setFilter('reafactoring')}>Refactoring</button>
          <button onClick={() => setFilter('agile')}>Agile</button>
          <button onClick={() => setFilter('patterns')}>Patterns</button>
          <button onClick={() => setFilter('design')}>Design</button>
          <button onClick={() => setFilter('fantasia')}>Fantasia</button>
          <button onClick={() => setFilter('hheuvos avinagrados')}>Huevos avinagrados</button>
          <button onClick={() => setFilter('allBooks')}>All books</button>
        </ul>
      </div>
    </div>
  )
}

export default Books
