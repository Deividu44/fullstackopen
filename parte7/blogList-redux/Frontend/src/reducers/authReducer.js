import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      return null
    }
  }
})

export const initialUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      dispatch(setUser(userLogged))
      blogService.setToken(userLogged.token)
    }
  }
}

export const login = userObject => {
  return async dispatch => {
    const userLogin = await loginService.login(userObject)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLogin))
    dispatch(setUser(userLogin))
    blogService.setToken(userLogin.token)
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }
}

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer
