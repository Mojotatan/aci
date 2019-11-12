import axios from 'axios'

import {sortBy, areArraysEqual} from '../utility'

// initial state
const initialState = {dealers: [], focus: null, sort: ['id'], reverse: false}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_DEALERS:
      newState.dealers = action.dealers
      if (newState.sort) newState.dealers.sort(sortBy(newState.sort, newState.reverse))
      return newState
    case FOCUS_DEALER:
      newState.focus = action.index
      return newState
    case CREATE_DEALER:
      newState.dealers.push(action.dealer)
      newState.focus = newState.dealers.length - 1
      newState.dealers[newState.focus].id = 'new'
      return newState
    case SORT_DEALERS:
      if (areArraysEqual(newState.sort, action.field)) {
        newState.reverse = !newState.reverse
      } else {
        newState.reverse = false
        newState.sort = action.field
      }
      newState.dealers.sort(sortBy(action.field, newState.reverse))
      return newState
    case FLUSH_DEALERS:
      newState.dealers = []
      newState.focus = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_DEALERS = 'LOAD_DEALERS'
export const loadDealers = (dealers) => {
  return {type: LOAD_DEALERS, dealers}
}

const FOCUS_DEALER = 'FOCUS_DEALER'
export const focusDealer = (index) => {
  return {type: FOCUS_DEALER, index}
}

const CREATE_DEALER = 'CREATE_DEALER'
export const createDealer = (dealer) => {
  return {type: CREATE_DEALER, dealer}
}

const SORT_DEALERS = 'SORT_DEALERS'
export const sortDealers = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
  return {type: SORT_DEALERS, field}
}

const FLUSH_DEALERS = 'FLUSH_DEALERS'
export const flushDealers = () => {
  return {type: FLUSH_DEALERS}
}

// thunks
export const loadDealersThunk = (token) => {
  return dispatch => {
    return axios.post('/api/dealers', {token})
    .then(res => {
      dispatch(loadDealers(res.data))
    })
    .catch(err => console.error(err))
  }
}

export const saveDealerThunk = (token, dealer, callback) => {
  return dispatch => {
    return axios.put('/api/dealers', {token, dealer})
    .then(res => {
      dispatch(loadDealersThunk(token))
      dispatch(focusDealer(null))
      if (callback) callback(dealer.id)
    })
    .catch(err => console.error(err))
  }
}

export const createDealerThunk = (token, dealer, callback) => {
  return dispatch => {
    return axios.post('/api/dealers/new', {token, dealer})
    .then(res => {
      dispatch(loadDealersThunk(token))
      dispatch(focusDealer(null))
      if (callback) callback(res.data.id)
    })
    .catch(err => console.error(err))
  }
}

export default reducer