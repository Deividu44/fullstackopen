import { useState } from 'react'

function FormBlog ({ addBlog }) {
  const [objectBlog, setObjectBlog] = useState({
    title: '', author: '', url: ''
  })

  const handleObjectBlog = (e) => {
    setObjectBlog({ ...objectBlog, [e.target.name]: e.target.value })
  }

  const submitBlog = e => {
    e.preventDefault()
    addBlog(objectBlog)
  }

  return(
    <form onSubmit={submitBlog}>
      <div>
        <label>
          Title:
          <input
            id='blog-title'
            type="text"
            name="title"
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
            type="text"
            name="author"
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
            type="text"
            name="url"
            value={objectBlog.url}
            onChange={handleObjectBlog}
          />
        </label>
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

export default FormBlog
