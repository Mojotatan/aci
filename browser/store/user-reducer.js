import axios from 'axios'

// initial state
const initialState = {name: null}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    default:
      return newState
  }
}

// constants and action creators


// thunks

export default reducer