function Notification ({ message }) {
  return (
    <div className={message?.notificationType === 'error' ? 'messageError' : 'messageSuccess'}>
      {message.message}
    </div>
  )
}

export default Notification
