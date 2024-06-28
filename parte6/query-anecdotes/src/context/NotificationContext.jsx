import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return ''
  }
}

const NotificationContext = createContext()

export const NotiContextValue = () => {
  return useContext(NotificationContext)[0]
}

export const NotiContextDispatch = () => {
  return useContext(NotificationContext)[1]
}

export const NotificationContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notificationReducer, '')

   return (
    <NotificationContext.Provider value={[noti, notiDispatch]} >
      {props.children}
    </NotificationContext.Provider>
   )
}

export default NotificationContext
