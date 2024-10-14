import { createSlice, current} from "@reduxjs/toolkit"
import { setNotification, clearNotification } from "./notificationReducer" // Asegúrate de importar las acciones


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      console.log("El payload que recibo es: "  , action.payload)
      const id = action.payload.id
      console.log("El id es: ", id)
      const anecdoteToChange = state.find(n => n.id === id)
      console.log("La anecdota a cambiar es: ", anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      //La funcion map va a devolver un array nuevo, basado en el array actual y el nuevo objeto
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    createAnecdote: (state, action) => {
//      state.push(action.payload)
      const content = action.payload //está recibiendo solo 1 campo payload
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0
      }


      return [...state, newAnecdote] //Creo un nuevo array donde es basado en el estado actual y le appendeo el nuevo objeto
    },
    setAnecdotes: (state, action) => {
      return action.payload //Esto se va a guardar en el state de redux, cuyo payload debe ser el array de anecdotas recibido
    }
  }
})

export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions

// Agrega las funciones de voto y creación con notificaciones
export const voteAnecdoteWithNotification = (anecdote) => {
  return async (dispatch) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000) // Elimina la notificación después de 5 segundos
  }
}

export const createAnecdoteWithNotification = (content) => {
  return async (dispatch) => {
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Creaste una nueva anécdota: ${content}`))
    
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000) // Elimina la notificación después de 5 segundos
  }
}


export default anecdoteSlice.reducer

/*
  Si yo llamo a esta funcion con dispatch, entonces me va a ejecutar el reducer. 
  ¿Por qué sucede esto? 
  Porque yo definí que el store en main.jsx de la siguiente manera:
  
  import reducer from './reducers/anecdoteReducer'
  const store = createStore(reducer)

  Entonces los dispatch sirven para llamar al reducer.
*/
// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     payload: {
//       content
//     }
//   }
// }


// /* 
//   Aclaraciones de un reducer:
//   -Sí, lo que retorna el reducer siempre afecta al estado en Redux. El return va a modificar el state del store de redux.
//   -El map es clave aquí, ya que crea un nuevo array en lugar de modificar el original. Esto es fundamental en Redux, ya que el estado debe ser inmutable, es decir, no debes modificar el array original directamente.

// */
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }

//       //La funcion map va a devolver un array nuevo, basado en el array actual y el nuevo objeto
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote 
//       )
//     }
//     case 'CREATE':{

//       const content = action.payload.content
//       const newAnecdote = {
//         content,
//         id: getId(),
//         votes: 0
//       }

//       return [...state, newAnecdote] //Creo un nuevo array donde es basado en el estado actual y le appendeo el nuevo objeto
//     }

//     default:
//       return state
//   }
// }

// export default reducer