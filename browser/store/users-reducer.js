import axios from 'axios'

import {loadCustomersThunk} from './customer-reducer'
import {throwAlert} from './alert-reducer'

import {sortBy, areArraysEqual} from '../utility'

// initial state
const initialState = {users: [], focus: null, sort: ['id'], reverse: false}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_USERS:
      newState.users = action.users
      if (newState.sort && Array.isArray(newState.users)) newState.users.sort(sortBy(newState.sort, newState.reverse))
      return newState
    case FOCUS_USER:
      newState.focus = action.index
      return newState
    case CREATE_USER:
      newState.users.push(action.user)
      newState.focus = newState.users.length - 1
      newState.users[newState.focus].id = 'new'
      return newState
    case SORT_USERS:
      if (areArraysEqual(newState.sort, action.field)) {
        newState.reverse = !newState.reverse
      } else {
        newState.reverse = false
        newState.sort = action.field
      }
      if (Array.isArray(newState.users)) newState.users.sort(sortBy(action.field, newState.reverse))
      return newState
    case FLUSH_USERS:
      newState.users = []
      newState.focus = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_USERS = 'LOAD_USERS'
export const loadUsers = (users) => {
  return {type: LOAD_USERS, users}
}

const FOCUS_USER = 'FOCUS_USER'
export const focusUser = (index) => {
  return {type: FOCUS_USER, index}
}

const CREATE_USER = 'CREATE_USER'
export const createUser = (user) => {
  return {type: CREATE_USER, user}
}

const SORT_USERS = 'SORT_USERS'
export const sortUsers = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
  return {type: SORT_USERS, field}
}

const FLUSH_USERS = 'FLUSH_USERS'
export const flushUsers = () => {
  return {type: FLUSH_USERS}
}

// thunks
export const loadUsersThunk = (token) => {
  return dispatch => {
    return axios.post('/api/users', {token})
    .then(res => {
      dispatch(loadUsers(res.data))
    })
    .catch(err => console.error(err))
  }
}

export const saveUserThunk = (token, user, callback) => {
  return dispatch => {
    let filterUser = Object.assign({}, user)
    filterUser.dealerId = (Number(filterUser.dealerId) === 0) ? null : Number(filterUser.dealerId)
    filterUser.regionId = (Number(filterUser.regionId) === 0) ? null : Number(filterUser.regionId)
    filterUser.branchId = (Number(filterUser.branchId) === 0) ? null : Number(filterUser.branchId)

    if (filterUser.password === '' && filterUser.id !== 'new') {
      delete filterUser.password
    }

    return axios.put('/api/users', {token, user: filterUser})
    .then(res => {
      if (res.data.err) {
        dispatch(throwAlert('red', 'There was an error with your changes'))
        console.log(res.data.err)
      }
      else {
        dispatch(throwAlert('green', 'Your changes have been saved'))
        if (user.id === 'new') {
          dispatch(sortUsers(['id']))
        }
        dispatch(loadUsersThunk(token))
        if (callback) callback()
      }
    })
    .catch(err => console.error(err))
  }
}

export default reducer