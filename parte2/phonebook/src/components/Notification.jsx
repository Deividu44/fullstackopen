function Notification ({notification}) {
  if(notification === null) return

  const isSuccess = notification.type === 'success'
   ? 'notification_success' 
   : 'notification_error'

  return(
    <div className={isSuccess}>
      {notification.message}
    </div>
  )
}

export default Notification