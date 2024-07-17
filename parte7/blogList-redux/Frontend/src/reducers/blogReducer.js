import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog: (state, action) => {
      state.push(action.payload)
    },

    incrementVote: (state, action) => {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      let newLikes = blogToChange.likes
      newLikes++
      const changedBlog = {
        ...blogToChange,
        likes: newLikes
      }

      return state.map(blog => blog.id !== id
        ? blog
        : changedBlog
      )
    },

    removeBlog: (state, action) => {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },

    setBlog: (state, action) => {
      return action.payload
    }
  }
})

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = objectBlog => {
  return async dispatch => {
    const result = await blogService.create(objectBlog)
    dispatch(newBlog(result))
  }
}

export const updateVote = (objectBlog, id) => {
  return async dispatch => {
    await blogService.update(objectBlog, id)
    dispatch(incrementVote(id))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const { newBlog, incrementVote, removeBlog, setBlog } = blogSlice.actions

export default blogSlice.reducer
