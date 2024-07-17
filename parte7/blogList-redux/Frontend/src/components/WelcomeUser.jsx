import { useDispatch, useSelector } from 'react-redux'
import FormBlog from './FormBlog'
import { logout } from '../reducers/authReducer'

function WelcomeUser (props) {
  const userLogged = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()

  return (
    <>
      <p>Welcome {userLogged.username}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <FormBlog onAddBlog={props.handleBlog} />
    </>
  )
}

export default WelcomeUser
