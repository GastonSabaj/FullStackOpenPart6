import { useSelector } from 'react-redux'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  // Uso el valor de la notificacion del store
  // const notification = useSelector((state) => state.notification)

  //Uso el valor de la notificacion del context
  const notification = useNotificationValue()

  console.log("La notificacion es: ", notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification