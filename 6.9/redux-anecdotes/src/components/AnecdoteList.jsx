import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdotesList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector( ({anecdotes,filter}) => {
        return anecdotes.filter(note => note.content.includes(filter))
    })
    

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => dispatch(voteAnecdote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default AnecdotesList;