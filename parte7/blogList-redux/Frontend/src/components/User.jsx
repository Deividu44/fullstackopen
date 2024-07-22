import { useParams } from 'react-router-dom'

function User ({ users }) {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) return null
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Blogs creados</h2>

      <ul>
        {
          user.blogs.length !== 0
            ? user.blogs.map(e => (
              <li key={e.id}>{e.title}</li>

            ))
            : <h1>No blogs created yet</h1>
        }
      </ul>

    </div>
  )
}

export default User
