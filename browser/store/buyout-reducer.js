import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'
import {throwAlert} from './alert-reducer'

import {sortBy} from '../utility'

// initial state
const initialState = {byos: [], focus: null, sort: ['date']}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_BYOS:
      newState.byos = action.byos
      if (newState.sort) newState.byos.sort(sortBy(newState.sort))
      return newState
    case FOCUS_BYO:
      newState.focus = action.id
      return newState
    case CREATE_BYO:
      newState.byos.push(action.byo)
      newState.focus = action.byo.id
      return newState
    case SORT_BYOS:
      newState.sort = action.field
      newState.byos.sort(sortBy(action.field))
      return newState
    case FLUSH_BYOS:
      newState.byos = []
      newState.focus = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_BYOS = 'LOAD_BYOS'
export const loadByos = (byos) => {
  return {type: LOAD_BYOS, byos}
}

const FOCUS_BYO = 'FOCUS_BYO'
export const focusByo = (id) => {
  return {type: FOCUS_BYO, id}
}

const CREATE_BYO = 'CREATE_BYO'
export const createByo = (byo) => {
  return {type: CREATE_BYO, byo}
}

const SORT_BYOS = 'SORT_BYOS'
export const sortByos = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
  return {type: SORT_BYOS, field}
}

const FLUSH_BYOS = 'FLUSH_BYOS'
export const flushByos = () => {
  return {type: FLUSH_BYOS}
}

// thunks
export const loadByosThunk = (token, callback) => {
  return dispatch => {
    return axios.post('/api/byos', {token})
    .then(res => {
      // expecting res to have a list of buyouts
      // and a list of branch + dealer associations through rep
      // and a list of lease (+ machine) associations
      res.data.byos.forEach((byo, index) => {
        byo.leases = res.data.leases[index]
        if (res.data.dealers[index]) {
          byo.dealer = res.data.dealers[index].name
        }
        if (res.data.branches[index]) {
          byo.branch = res.data.branches[index].name
        }
      })
      dispatch(loadByos(res.data.byos))
      if (callback) callback()
    })
    .catch(err => console.error(err))
  }
}

export const saveByoThunk = (token, byo, customer, callback) => {
  let byoArgs = Object.assign({}, ...byo)
  let cusArgs = Object.assign({}, ...customer)
  return dispatch => {
    return axios.put('/api/byos', {token, byo: byoArgs, customer: cusArgs})
    .then(res => {
      if (res.data.err) {
        console.error(res.data.err)
        dispatch(throwAlert('red', 'There was an error with your buyout'))
      }
      else {
        dispatch(throwAlert('green', `Your buyout has been ${(byoArgs.status === 'New' && byo[0].status === 'Draft') ? 'submitted' : 'saved'}`))
        if (byoArgs.id === 'new') {
          dispatch(sortByos(['id']))
        }
        dispatch(loadByosThunk(token, () => {if (callback) callback(res.data)}))
        dispatch(loadCustomersThunk(token))
      }
    })
    .catch(err => console.error(err))
  }
}

export const createByoThunk = (token, callback) => {
  return dispatch => {
    return axios.post('/api/byos/new', {token})
    .then(res => {
      if (res.status === 201) {
        let byo = res.data
        byo.leases = []
        byo.customer = {}
        dispatch(createByo(byo))
        if (callback) callback()
      } else {
        dispatch(throwAlert('red', 'Internal server error'))
      }
    })
    .catch(err => console.error(err))
  }
}

export const deleteByoThunk = (token, id, callback) => {
  return dispatch => {
    return axios.put('/api/byos/delete', {token, byo: id})
    .then(res => {
      if (res.data.err) {
        console.error(res.data.err)
        dispatch(throwAlert('red', 'Something went wrong'))
      } else {
        dispatch(throwAlert('green', 'Your buyout has been deleted'))
        // dispatch(loadByosThunk(token))
        if (callback) callback()
      }
    })
    .catch(err => console.error(err))
  }
}

export default reducer