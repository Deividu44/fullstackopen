import { useSelector } from "react-redux"

const Notification = () => {
  const notifications = useSelector(({ notification }) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    (notifications &&
      <div style={style}>
        {notifications}
      </div>
    )
  )
}

export default Notification