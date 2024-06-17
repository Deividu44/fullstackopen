import { useState } from "react"

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
