import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdoteWithoutNotification } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import {useNotificationDispatch} from "../NotificationContext"
import { setNotification, clearNotification } from '../reducers/notificationReducer'; // Asegúrate de importar las acciones


const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdotesList = () => {

    const dispatch = useDispatch()
    const notificationDispatch = useNotificationDispatch()


    //Agarro del store de redux las anécdotas filtradas
    const anecdotes = useSelector( ({anecdotes,filter}) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    //Defino el handler para votar. Tengo que definir esta funcion acá porque el useNotificationDispatch no es de redux, y se debe utilizar dentro de un componente funcional
    const handleVote = async (anecdote) => {
        //Necesario para actualizar el estado del store de redux
        await dispatch(voteAnecdoteWithoutNotification(anecdote))
        
        console.log("Ahora llamo al setNotification de mi contexto de notificación")
        // Muestra la notificación
        notificationDispatch(setNotification(`You voted '${anecdote.content}'`));

        // Limpia la notificación después de 5 segundos
        setTimeout(() => {
            notificationDispatch(clearNotification());
        }, 5000);
    }

    



    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                   // handleVote={() => dispatch(voteAnecdoteWithNotification(anecdote))}
                    handleVote={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdotesList;