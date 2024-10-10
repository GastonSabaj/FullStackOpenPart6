import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from './reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
/* 
    useSelector recibe una función como parámetro. La función busca o selecciona datos del store de Redux. 
    Aquí necesitamos todas las notas, por lo que nuestra función de selector devuelve el estado completo:

        state => statec
    
    que es una abreviatura de:
    
        (state) => {
            return state
        }
  
  */
  const notes = useSelector( ({ notes, filter }) => {
    if ( filter === 'ALL' ) {
      return notes
    }
    return filter  === 'IMPORTANT' 
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })


  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes