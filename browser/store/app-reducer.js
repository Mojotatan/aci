import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'
import {throwAlert} from './alert-reducer'

import {sortBy} from '../utility'

// initial state
const initialState = {apps: [], focus: null, sort: ['date']}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_APPS:
      newState.apps = action.apps
      if (newState.sort) newState.apps.sort(sortBy(newState.sort))
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
      newState.sort = action.field
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
export const sortApps = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
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
      // expecting res to have a list of applications
      // and a list of branch + dealer associations through rep
      // and a list of lease associations
      // and a list of admin actions applied to that application
      res.data.apps.forEach((app, index) => {
        app.leases = res.data.leases[index]
        if (res.data.dealers[index]) {
          app.dealer = res.data.dealers[index].name
        }
        if (res.data.branches[index]) {
          app.branch = res.data.branches[index].name
        }
        app.actions = res.data.actions[index]
      })
      dispatch(loadApps(res.data.apps))
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
      if (res.data.err) {
        console.error(res.data.err)
        dispatch(throwAlert('red', 'There was an error with your application'))
      }
      else {
        dispatch(throwAlert('green', `Your application has been ${(appArgs.status === 'Submitted' && app[0].status === 'Draft') ? 'submitted' : 'saved'}`))
        if (appArgs.id === 'new') {
          dispatch(sortApps(['id']))
        }
        dispatch(loadAppsThunk(token))
        dispatch(loadCustomersThunk(token))
      }
    })
    .catch(err => console.error(err))
  }
}

export default reducer