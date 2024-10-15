import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import store from './store'
import {NotificationContextProvider} from './NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
)