import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Filter/>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App