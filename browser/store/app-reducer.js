import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'

import {sortBy} from '../utility'

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
    case CREATE_APP:
      newState.apps.push(action.app)
      newState.focus = newState.apps.length - 1
      newState.apps[newState.focus].id = 'new'
      return newState
    case SORT_APPS:
      newState.apps.sort(sortBy(action.field))
      return newState
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

const CREATE_APP = 'CREATE_APP'
export const createApp = (app) => {
  return {type: CREATE_APP, app}
}

const SORT_APPS = 'SORT_APPS'
export const sortApps = (field) => {
  return {type: SORT_APPS, field}
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

export const saveAppThunk = (token, app, customer) => {
  let appArgs = Object.assign({}, ...app)
  let cusArgs = Object.assign({}, ...customer)
  return dispatch => {
    return axios.put('/api/apps', {token, app: appArgs, customer: cusArgs})
    .then(res => {
      dispatch(loadAppsThunk(token))
      dispatch(loadCustomersThunk(token))
    })
    .catch(err => console.error(err))
  }
}

export default reducer