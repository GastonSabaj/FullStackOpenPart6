import { createSlice, current} from "@reduxjs/toolkit"
import noteService from '../services/notes'


const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export  const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }


/* 
Algunos comentarios:

  Esta llamada a dispatch equivale a enviar el siguiente objeto:
    dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })

  Ahora la accion se llama "notes/createNote".
*/

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   state.push(action.payload)

    //   // const content = action.payload
    //   // state.push({
    //   //   content,
    //   //   important: false,
    //   //   id: generateId(),
    //   // })
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }

      console.log(current(state))


      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer