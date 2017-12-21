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
      newState.user = {
        name: action.name,
        level: action.level
      }
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
export const logInToken = (token, name, level) => {
  return {type: LOG_IN, token, name, level}
}

const LOG_OUT = 'LOG_OUT'
export const flushToken = () => {
  return {type: LOG_OUT}
}

// thunks

export default reducer