import { createSlice, current} from "@reduxjs/toolkit"
import { setNotification, clearNotification } from "./notificationReducer" // Asegúrate de importar las acciones
import anecdoteService from "../services/anecdoteService"
import {useNotificationDispatch} from "../NotificationContext"

const getId = () => (100000 * Math.random()).toFixed(0)

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
    appendAnecdote: (state, action) => {
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

export const {appendAnecdote,voteAnecdote, setAnecdotes} = anecdoteSlice.actions

/* 
  setNotificationWithTime es un action creator que devuelve una función. Para que esta función se ejecute correctamente, debe 
ser despachada a través de dispatch. Si solo llamas a la función directamente como lo hacías, no se despacha, por lo que 
la notificación no se actualiza.
*/
// export const setNotificationWithTime = (text, timeInSeconds) => {
//   return async (dispatch) => {
//     //Se llama a la funcion que actualiza el estado de redux
//     dispatch(setNotification(text))
//     setTimeout(() => {
//       //Se llama a la funcion que actualiza el estado de redux
//       dispatch(clearNotification())
//     }, timeInSeconds * 1000)
//   }
// }



// Agrega las funciones de voto y creación con notificaciones
export const voteAnecdoteWithoutNotification = (anecdote) => {
  return async (dispatch) => {

    // Actualizo el estado del store de redux, llamando a la action voteAnecdote
    dispatch(voteAnecdote(anecdote))
    //Actualizo la BD
    const updatedAnecdote = await anecdoteService.vote(anecdote.id)
    console.log("Ahora la BD tiene: ", updatedAnecdote)
    // dispatch(setNotificationWithTime(`voted '${updatedAnecdote.content}'`, 5))
  }
}

export const createAnecdoteWithoutNotification = (content) => {
  return async (dispatch) => {
    dispatch(appendAnecdote(content))
    // dispatch(setNotificationWithTime(`created '${content}'`, 5))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdoteWithoutNotification(newAnecdote))

  }
}


export default anecdoteSlice.reducer
