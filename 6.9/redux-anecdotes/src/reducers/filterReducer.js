export const filterChange = (filterContent) => {
    return {
      type: 'SET_FILTER',
      payload: { filterContent }
    }
  }


const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload.filterContent
        default:
            return state
    }
}

export default filterReducer

