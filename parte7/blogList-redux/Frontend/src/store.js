import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    auth: authReducer
  }
})
