function Blog ({ blog }) {

  return (
    <li key={blog.id}>
      <p>Titulo: {blog.title}</p>
      <p>Autor: {blog.author}</p>
      <p>Enlace: {blog.url}</p>
      <p>Me gusta: {blog.likes}</p>
    </li>
  )
}

export default Blog
