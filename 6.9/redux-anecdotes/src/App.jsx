import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

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