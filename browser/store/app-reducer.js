import axios from 'axios'

// initial state
const initialState = {apps: [], focus: null}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_APPS:
      newState.apps = action.apps
      return newState
    case FOCUS_APP:
      newState.focus = action.index
      return newState
    // case UPDATE_APP:
    //   newState.apps[focus] = Object.assign({}, newState.apps[focus], action.newValues)
    //   return newState
    case FLUSH_APPS:
      newState.apps = []
      newState.focus = null
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

const FOCUS_APP = 'FOCUS_APP'
export const focusApp = (index) => {
  return {type: FOCUS_APP, index}
}

// const UPDATE_APP = 'UPDATE_APP'
// export const updateApp = (newValues) => {
//   return {type: UPDATE_APP, newValues}
// }

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

export const saveAppThunk = (token, app) => {
  return dispatch => {
    return axios.put('/api/apps', {token, app})
    .then(res => {
      dispatch(loadAppsThunk(token))
    })
    .catch(err => console.error(err))
  }
}

export default reducer