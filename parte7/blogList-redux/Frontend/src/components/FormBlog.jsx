import { useRef, useState } from 'react'
import Togglable from './Togglable'

function FormBlog ({ onAddBlog }) {
  const [objectBlog, setObjectBlog] = useState({
    title: '', author: '', url: ''
  })
  const blogFormRef = useRef()

  const handleObjectBlog = (e) => {
    setObjectBlog({ ...objectBlog, [e.target.name]: e.target.value })
  }

  const submitBlog = e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    onAddBlog(objectBlog)
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
