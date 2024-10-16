import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.content.value
        event.target.content.value = ''

        dispatch(createAnecdote(content))
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