import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE, USERLOGGED } from "../../queries"

function Recommend ({ show }) {
  const userData = useQuery(USERLOGGED)
  const fav = userData.data?.me?.favoriteGenre
  
  const { data } = useQuery(BOOKS_BY_GENRE, { variables: { genre: fav }})
  const books = data?.allBooks
  
  if (!show) return null
  
  return (
    <div>
      <h2>books</h2>
      <h3>Books in your favorite genre {fav}</h3>
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
      </div>
  )
}

export default  Recommend