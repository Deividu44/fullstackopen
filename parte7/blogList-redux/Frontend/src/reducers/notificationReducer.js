import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    },
    removeNotification: (state, action) => {
      return ''
    }
  }
})

export const setNofitication = (noti) => {
  return dispatch => {
    dispatch(showNotification(noti))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 2000)
  }
}

export const {
  showNotification,
  removeNotification
} = notificationSlice.actions

export default notificationSlice.reducer
