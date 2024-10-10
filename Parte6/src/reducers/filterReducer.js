export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  

const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload //El return de este reducer va a ser el nuevo state
      default:
        return state
    }
}


export default filterReducer