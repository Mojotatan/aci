import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'
import {throwError} from './error-reducer'

import {sortBy} from '../utility'

// initial state
const initialState = {byos: [], focus: null, sort: ['id']}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_BYOS:
      newState.byos = action.byos
      if (newState.sort) newState.byos.sort(sortBy(newState.sort))
      return newState
    case FOCUS_BYO:
      newState.focus = action.index
      return newState
    case CREATE_BYO:
      newState.byos.push(action.byo)
      newState.focus = newState.byos.length - 1
      newState.byos[newState.focus].id = 'new'
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
export const focusByo = (index) => {
  return {type: FOCUS_BYO, index}
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
    })
    .catch(err => console.error(err))
  }
}

export const saveByoThunk = (token, byo, customer) => {
  let byoArgs = Object.assign({}, ...byo)
  let cusArgs = Object.assign({}, ...customer)
  return dispatch => {
    return axios.put('/api/byos', {token, byo: byoArgs, customer: cusArgs})
    .then(res => {
      if (res.data.err) dispatch(throwError('red', 'There was an error with your buyout'))
      else {
        dispatch(throwError('green', `Your buyout has been ${(byoArgs.status === 'Submitted' && byo[0].status === 'Draft') ? 'submitted' : 'saved'}`))
        if (byoArgs.id === 'new') {
          dispatch(sortByos(['id']))
        }
        dispatch(loadByosThunk(token))
        dispatch(loadCustomersThunk(token))
      }
    })
    .catch(err => console.error(err))
  }
}

export default reducer