import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'showNotification':
    return action.payload

  default:
    return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[noti, notiDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
