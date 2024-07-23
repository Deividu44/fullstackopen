import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Notification () {
  const notifications = useSelector(({ notification }) => notification)
  return (
    (notifications &&
      <Alert variant={notifications?.type === 'error' ? 'danger' : 'success'}>
        {notifications?.message}
      </Alert>
    )

  )
}

export default Notification
