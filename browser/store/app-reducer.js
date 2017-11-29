import axios from 'axios'

// initial state
const initialState = {apps: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_APPS:
      newState.apps = action.apps
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_APPS = 'LOAD_APPS'
export const loadApps = (apps) => {
  return {type: LOAD_APPS, apps}
}

// thunks

export default reducer