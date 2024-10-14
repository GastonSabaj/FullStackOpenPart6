import { useDispatch } from "react-redux";
import { createAnecdoteWithNotification } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.content.value
        event.target.content.value = ''
        const newAnecdote = await anecdoteService.createNew(content)

        dispatch(createAnecdoteWithNotification(content))
    }

    return(
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