import { createSlice } from "@reduxjs/toolkit"

const notficationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    },

    removeNotification: () => {
      return ''
    }
  }
})

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(showNotification(text))

    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notficationSlice.reducer
export const { showNotification, removeNotification } = notficationSlice.actions