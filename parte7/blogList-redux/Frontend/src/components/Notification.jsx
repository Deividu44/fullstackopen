import { useSelector } from 'react-redux'

function Notification () {
  const notifications = useSelector(({ notification }) => notification)
  return (
    (notifications &&
      <div className={notifications?.type === 'error' ? 'messageError' : 'messageSuccess'}>
        {notifications.message}
      </div>
    )
  )
}

export default Notification
