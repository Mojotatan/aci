import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'
import {loadLeasesThunk} from './lease-reducer'
import {throwAlert} from './alert-reducer'

import {sortBy, areArraysEqual, getDate} from '../utility'

// initial state
const initialState = {apps: [], focus: null, sort: ['date'], reverse: false}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_APPS:
      newState.apps = action.apps
      if (newState.sort) newState.apps.sort(sortBy(newState.sort, newState.reverse))
      return newState
    case FOCUS_APP:
      newState.focus = action.id
      return newState
    case CREATE_APP:
      newState.apps.push(action.app)
      newState.focus = action.app.id
      return newState
    case SORT_APPS:
      if (areArraysEqual(newState.sort, action.field)) {
        newState.reverse = !newState.reverse
      } else {
        newState.reverse = false
        newState.sort = action.field
      }
      newState.apps.sort(sortBy(action.field, newState.reverse))
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
export const focusApp = (id) => {
  return {type: FOCUS_APP, id}
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
export const loadAppsThunk = (token, callback) => {
  return dispatch => {
    return axios.post('/api/apps', {token})
    .then(res => {
      // expecting res to have a list of applications
      // and a list of lease (+ machine) associations
      // and a list of admin actions applied to that application
      // and a list of logs for those admin actions

      // let leases = [] // need to track lease companies for autofill

      // console.log(res.data)
      res.data.apps.forEach((app, index) => {
        app.leases = res.data.leases[index]
        // leases = [...leases, ...res.data.leases[index].map(lse => lse.company)]

        let actions = res.data.actions[index]
        app.actions = []
        actions = actions.filter(act => {
          if (act.sentToRep) app.actions.push(act)
          else return true
        })
        app.actions = [...app.actions, ...actions]
        
        app.logs = res.data.logs[index].filter(log => {
          return (log.date <= getDate())
        })
      })
      dispatch(loadApps(res.data.apps))
      // dispatch(loadLeases(leases))
      if (callback) callback()
    })
    .catch(err => console.error(err))
  }
}

export const saveAppThunk = (token, app, customer, callback) => {
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
        dispatch(throwAlert('green', `Your application has been ${(appArgs.status === 'New' && app[0].status === 'Draft') ? 'submitted' : 'saved'}`))
        if (appArgs.id === 'new') {
          dispatch(sortApps(['id']))
        }
        dispatch(loadAppsThunk(token, () => {if (callback) callback(res.data)}))
        dispatch(loadCustomersThunk(token))
        dispatch(loadLeasesThunk(token))
        if (appArgs.status === 'New' && app[0].status === 'Draft') {
          axios.post('/api/mail/appSubmit', {
            token,
            rep: appArgs.rep,
            customer: appArgs.customer
          })
          .then(res => console.log(res.data))
          .catch(err => console.error(err))
        }
      }
    })
    .catch(err => console.error(err))
  }
}

export const createAppThunk = (token, callback) => {
  return dispatch => {
    return axios.post('/api/apps/new', {token})
    .then(res => {
      if (res.status === 201) {
        let app = res.data
        app.leases = []
        app.customer = {}
        app.actions = []
        app.logs = []
        dispatch(createApp(app))
        if (callback) callback()
      } else {
        dispatch(throwAlert('red', 'Internal server error'))
      }
    })
    .catch(err => console.error(err))
  }
}

export const deleteAppThunk = (token, id, callback) => {
  return dispatch => {
    return axios.put('/api/apps/delete', {token, app: id})
    .then(res => {
      if (res.data.err) {
        console.error(res.data.err)
        dispatch(throwAlert('red', 'Something went wrong'))
      } else {
        dispatch(throwAlert('green', 'Your application has been deleted'))
        // dispatch(loadAppsThunk(token))
        if (callback) callback()
      }
    })
    .catch(err => console.error(err))
  }
}

export default reducer