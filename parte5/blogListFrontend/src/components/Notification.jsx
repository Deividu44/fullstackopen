function Notification ({ message }) {
  return (
    <div className={message?.type === 'error' ? 'messageError' : 'messageSuccess'}>
      {message.message}
    </div>
  )
}

export default Notification
