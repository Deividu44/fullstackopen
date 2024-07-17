import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { setNofitication } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

function FormBlog () {
  const [objectBlog, setObjectBlog] = useState({
    title: '', author: '', url: ''
  })
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleObjectBlog = (e) => {
    setObjectBlog({ ...objectBlog, [e.target.name]: e.target.value })
  }

  const submitBlog = e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    handleBlog(objectBlog)
  }

  const handleBlog = (objectBlog) => {
    try {
      dispatch(createBlog(objectBlog))
      const notiObject = {
        message: `A new blog ${objectBlog.title} by ${objectBlog.author}  added`,
        type: 'success'
      }
      dispatch(setNofitication(notiObject))
    } catch (error) {
      dispatch(setNofitication({ message: error.response.data.error, type: 'error' }))
    }
  }

  return (
    <Togglable buttonLabel='New note' ref={blogFormRef}>
      <form onSubmit={submitBlog}>
        <div>
          <label>
            Title:
            <input
              id='blog-title'
              type='text'
              name='title'
              value={objectBlog.title}
              onChange={handleObjectBlog}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              id='blog-author'
              type='text'
              name='author'
              value={objectBlog.author}
              onChange={handleObjectBlog}
            />
          </label>
        </div>
        <div>
          <label>
            Link:
            <input
              id='blog-url'
              type='text'
              name='url'
              value={objectBlog.url}
              onChange={handleObjectBlog}
            />
          </label>
        </div>
        <button type='submit'>Add Blog</button>
      </form>
    </Togglable>

  )
}

export default FormBlog
