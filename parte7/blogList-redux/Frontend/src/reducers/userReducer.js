import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    }
  }
})

export const getUsers = () => {
  return async dispatch => {
    const res = await userService.getAll()
    dispatch(setUsers(res))
  }
}

export const { setUsers } = userSlice.actions

export default userSlice.reducer
