import axios from 'axios'

// initial state
const initialState = {}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    // case BLAH:
    default:
      return newState
  }
}

// constants and action creators

// thunks

export default reducer