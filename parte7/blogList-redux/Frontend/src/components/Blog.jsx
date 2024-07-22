import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateVote } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

function Blog ({ blogs }) {
  const user = useSelector(({ auth }) => auth)
  const [show, setShow] = useState(false)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

  const isUser = blog.user.name === user?.name

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
    dispatch(deleteBlog(blog.id))
  }

  const upVote = blog => {
    const { likes } = blog
    const blogToUpdate = { ...blog, likes: likes + 1 }
    dispatch(updateVote(blogToUpdate, blog.id))
  }

  if (!blog) return null
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
            <button onClick={() => upVote(blog)}>👍</button>
          </p>
          <p>{blog.user.name}</p>
          {isUser &&
            <button type='text' onClick={confirmDelete}>Delete</button>}
        </div>}
    </li>
  )
}

export default Blog
