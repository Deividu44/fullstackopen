import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

function WelcomeUser () {
  const userLogged = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()

  const menu = {
    padding: 6

  }

  return (
    <>
      <Navbar style={menu} collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link style={menu} href='#' as='span'>
              <Link to='/'>Home</Link>
            </Nav.Link>
            <Nav.Link style={menu} href='#' as='span'>
              <Link to='/blogs'>Blogs</Link>
            </Nav.Link>
            <Nav.Link style={menu} href='#' as='span'>
              <Link to='/users'>Users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <p style={menu} className='fs-5'>Welcome {userLogged.username}</p>
      <Button
        className='bg-secondary'
        onClick={() => dispatch(logout())}
      >Logout
      </Button>
    </>
  )
}

export default WelcomeUser
