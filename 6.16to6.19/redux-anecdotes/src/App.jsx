import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { useDispatch } from 'react-redux'
import { setAnecdotes, initializeAnecdotes } from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, []) 

  return (
    <div>
      <Filter/>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App