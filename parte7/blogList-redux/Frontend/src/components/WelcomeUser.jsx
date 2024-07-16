import FormBlog from './FormBlog'

function WelcomeUser (props) {
  return (
    <>
      <p>Welcome {props.user.username}</p>
      <button onClick={() => props.logout()}>Logout</button>
      <FormBlog onAddBlog={props.handleBlog} />
    </>
  )
}

export default WelcomeUser
