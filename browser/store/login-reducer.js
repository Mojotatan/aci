import axios from 'axios'

// initial state
const initialState = {token: null, user: null}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    // case BLAH:
    case LOG_IN:
      newState.token = action.token
      newState.user = action.user
      return newState
    case LOG_OUT:
      newState.token = null
      newState.user = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOG_IN = 'LOG_IN'
export const logInToken = (token, user) => {
  return {type: LOG_IN, token, user}
}

const LOG_OUT = 'LOG_OUT'
export const flushToken = () => {
  return {type: LOG_OUT}
}

// thunks

export default reducer