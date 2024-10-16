import { useEffect } from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { setNotes, initializeNotes } from './reducers/noteReducer'
import noteService from './services/notes'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes()) 
  }, []) 

  return (
    <div>
      <NewNote />
      <VisibilityFilter /> 
      <Notes />
    </div>
  )
}

export default App