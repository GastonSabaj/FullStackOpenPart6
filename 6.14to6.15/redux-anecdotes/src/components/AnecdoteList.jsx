import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteAnecdoteWithNotification } from '../reducers/anecdoteReducer'
import Notification from './Notification'

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
    const anecdotes = useSelector( ({anecdotes,filter}) => {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => dispatch(voteAnecdoteWithNotification(anecdote))}
                />
            )}
        </div>
    )
}

export default AnecdotesList;