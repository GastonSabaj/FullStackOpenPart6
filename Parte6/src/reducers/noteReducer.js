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

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export  const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}


const noteReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NEW_NOTE':
        console.log("Entré acá")
        return [...state, action.payload] //Devuelvo un nuevo array con la concatenacion de los anteriores y el nuevo objeto
      case 'TOGGLE_IMPORTANCE': {
        const id = action.payload.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
       }
      default:
        return state
    }
  }

  export default noteReducer