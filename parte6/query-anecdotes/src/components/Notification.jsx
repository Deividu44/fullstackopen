import { NotiContextValue } from "../context/NotificationContext"

const Notification = () => {
  const noti = NotiContextValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!noti) return null

  return (
      <div style={style}>
        {noti}
      </div>
  )
}

export default Notification
