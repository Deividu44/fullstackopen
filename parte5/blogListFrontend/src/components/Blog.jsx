import { useState } from 'react'

function Blog ({ blog, handleLike, handleDelete, actualUser }) {
  const [show, setShow] = useState(false)

  const isUser = blog.user.name === actualUser

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5,
    listStyle: 'none',
    fontSize: 28
  }

  const confirmDelete = () => {
    const askConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!askConfirm) return
    handleDelete(blog.id)
  }

  return (
    <li key={blog.id} style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setShow(!show)}>show</button>
      </p>
      {show &&
        <div>
          <p className='link'>Link: {blog.url}</p>
          <p>Likes: {blog.likes}
            <button onClick={() => handleLike(blog)}>👍</button>

          </p>

          <p>{blog.user.name}</p>

          {isUser &&
            <button type='text' onClick={confirmDelete}>Delete</button>}
        </div>}
    </li>
  )
}

export default Blog
