function FormBlog ({ addBlog, objectBlog, hanldeObjectBlog }) {

  return(
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title: 
          <input 
            type="text"
            name="title"
            value={objectBlog.title}
            onChange={hanldeObjectBlog}
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
            onChange={hanldeObjectBlog}
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
            onChange={hanldeObjectBlog}
          />
        </label>
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

export default FormBlog
