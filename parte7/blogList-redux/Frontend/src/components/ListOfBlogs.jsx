import { useSelector } from 'react-redux'
import { useState } from 'react'
import FormBlog from './FormBlog'
import { Link } from 'react-router-dom'

function ListOfBlogs () {
  const allBlogs = useSelector(({ blogs }) => blogs)
  const [sort, setSort] = useState(false)
  const hasBlogs = allBlogs.length !== 0

  const sortedBlogsByLikes = () => {
    const compare = (a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    }
    return [...allBlogs].sort(compare)
  }

  const sortedBlogs = sort ? sortedBlogsByLikes() : allBlogs

  return (
    <>
      <FormBlog />
      <h2>Blogs</h2>
      <input type='checkbox' onClick={() => setSort(!sort)} /> Sort by likes
      <div id='blogs-container'>
        <ul>
          {hasBlogs
            ? sortedBlogs.map(blog => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))
            : <h2>There are not blogs posted for the moment </h2>}
        </ul>
      </div>
    </>
  )
}

export default ListOfBlogs
