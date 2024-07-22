import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

function ListOfUsers () {
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <h1>Lista de usuarios: {users.length}</h1>

      {users.length !== 0
        ? <table>
          <tbody>
            <tr>
              <td>Usuarios</td>
              <td>n blogs</td>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : <h1>De momento no existe usuarios</h1>}
    </div>
  )
}

export default ListOfUsers
