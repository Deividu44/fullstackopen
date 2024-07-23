import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { setNofitication } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={submitBlog}>
        <Form.Group>
          <Form.Label className='mb-3 mt-3 fs-4'>Title: </Form.Label>
          <Form.Control
            type='text'
            id='blog-title'
            name='title'
            value={objectBlog.title}
            onChange={handleObjectBlog}
            placeholder='Bootstrap is wonderful'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='fs-4'>Author: </Form.Label>
          <Form.Control
            id='blog-auhtor'
            type='text'
            name='author'
            value={objectBlog.author}
            onChange={handleObjectBlog}
            placeholder='Miguel Angel Muñoz'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className='fs-4'>Url:</Form.Label>
          <Form.Control
            id='blog-url'
            type='text'
            name='url'
            value={objectBlog.url}
            onChange={handleObjectBlog}
            placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          />
        </Form.Group>
        <Button className='mb-2' type='submit'>Add Blog</Button>
      </Form>
    </Togglable>

  )
}

export default FormBlog
