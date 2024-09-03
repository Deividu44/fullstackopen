import { useQuery } from "@apollo/client"
import { query } from "../../queries"
import ChangeNumber from "./ChangeNumber"

const Authors = ({ show, setError }) => {
  const {loading, data} = useQuery(query)
  const authors = data?.allAuthors
  
  if(loading) return <div>Cargando...</div>
  
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChangeNumber setError={setError} authors={authors.map(a => a.name)}/>
    </div>
  )
}

export default Authors
