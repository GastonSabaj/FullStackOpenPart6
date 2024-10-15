import { useDispatch } from "react-redux";
import { createAnecdoteWithoutNotification } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";
import { useNotificationDispatch } from "../NotificationContext";
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const notificationDispatch = useNotificationDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        event.target.content.value = '';
        
        if (content.length < 5) {
            handleCreateNotification('too short anecdote, it should be at least 5 characters long');
            return; // Aquí se evita continuar si la longitud es menor a 5
        }

        const newAnecdote = await anecdoteService.createNew(content);
        
        // Despacha la acción solo si la longitud es válida
        dispatch(createAnecdoteWithoutNotification(newAnecdote.content));

        handleCreateNotification(`you created '${newAnecdote.content}'`);
    }

    const handleCreateNotification = (content) => {
        notificationDispatch(setNotification(content));
        setTimeout(() => {
            notificationDispatch(clearNotification());
        }, 5000);
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="content" />
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm;
