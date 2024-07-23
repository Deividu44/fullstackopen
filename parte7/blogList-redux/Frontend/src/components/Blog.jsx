import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteBlog, updateVote } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import FormComment from './FormComment'

function Blog ({ blogs }) {
  const user = useSelector(({ auth }) => auth)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

  const isUser = blog.user.name === user?.name

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

  const handleComment = (content) => {
    dispatch(createComment({ content }, blog.id))
  }

  if (!blog) return null

  return (
    <div key={blog.id}>
      <h1>
        {blog.title} {blog.author}
      </h1>

      <div>
        <p className='link'>Link: {blog.url}</p>
        <p>Likes: {blog.likes}
          <button onClick={() => upVote(blog)}>👍</button>
        </p>
        <p>Added by {blog.user.name}</p>
        <div>
          <h2>Comments</h2>
          <div>
            <FormComment handleComment={handleComment} />
          </div>
          <ul>
            {blog.comments.map(comment => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
        {isUser &&
          <button
            type='text'
            onClick={confirmDelete}
          >Delete
          </button>}
      </div>
    </div>
  )
}

export default Blog
