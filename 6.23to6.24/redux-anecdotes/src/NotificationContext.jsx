import { createContext, useReducer, useContext } from 'react'
import notificationSlice from './reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationSlice, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}
  
export const useNotificationDispatch = () => {
const notificationAndDispatch = useContext(NotificationContext)
return notificationAndDispatch[1]
}

export default NotificationContext