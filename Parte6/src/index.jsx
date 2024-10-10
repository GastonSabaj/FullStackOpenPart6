import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT': 
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }

// //Creo el store para el estado del contador, cuyo estado será modificado con el reducer counterReducer
// const store = createStore(counterReducer)

// const App = () => {
//   return (
//     <div>
//       <div>
//         {/* Imprimo el estado del contador */}
//         {store.getState()} 
//       </div>
//       <button 
//         onClick={e => store.dispatch({ type: 'INCREMENT' })}
//       >
//         plus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'DECREMENT' })}
//       >
//         minus
//       </button>
//       <button 
//         onClick={e => store.dispatch({ type: 'ZERO' })}
//       >
//         zero
//       </button>
//     </div>
//   )
// }

// El estado de un reducer debe estar compuesto por objetos inmutables (no se pueden modificar), por eso utilizo la funcion concat, que crea un nuevo array, basado en el array actual y el nuevo objeto
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type:"TOGGLE_IMPORTANCE",
  payload: {
    id: 2}
})

const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))

  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
//Cuando el store cambia, vuelvo a renderizar el componente <App />
store.subscribe(renderApp)