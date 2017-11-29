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
    case FLUSH_APPS:
      newState.apps = []
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

const FLUSH_APPS = 'FLUSH_APPS'
export const flushApps = () => {
  return {type: FLUSH_APPS}
}

// thunks
export const loadAppsThunk = (token) => {
  return dispatch => {
    return axios.post('/api/apps', {token})
    .then(res => {
      dispatch(loadApps(res.data))
    })
    .catch(err => console.error(err))
  }
}

export default reducer