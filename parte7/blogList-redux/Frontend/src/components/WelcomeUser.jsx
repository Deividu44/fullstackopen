import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { Link } from 'react-router-dom'

function WelcomeUser () {
  const userLogged = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()

  const menu = {
    padding: 6,
    background: '1px center #db506a',
    display: 'flex',
    gap: '2em'
  }

  return (
    <>
      <div style={menu}>
        <Link to='/'>Home</Link>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </div>
      <p>Welcome {userLogged.username}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  )
}

export default WelcomeUser
