// initial state
const initialState = {errQueue: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case THROW_ERROR:
      // not using push because react doesn't detect the change
      newState.errQueue = [...newState.errQueue, action.err]
      return newState
    case HANDLE_ERROR:
      newState.errQueue = newState.errQueue.slice(0, -1)
      return newState
    default:
      return newState
  }
}

// constants and action creators
const THROW_ERROR = 'THROW_ERROR'
export const throwError = (color, message) => {
  return {type: THROW_ERROR, err: {color, message}}
}

const HANDLE_ERROR = 'HANDLE_ERROR'
export const handleError = () => {
  return {type: HANDLE_ERROR}
}


export default reducer