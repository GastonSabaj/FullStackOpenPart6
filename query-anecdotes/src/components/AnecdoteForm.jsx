import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,

    onSuccess: () => {
      // Invalida la query de 'anecdotes', para que se refresquen los datos de 'anecdotes'
      queryClient.invalidateQueries(['anecdotes']) //'anecdotes' es el nombre del array definido en db.json
    },
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
