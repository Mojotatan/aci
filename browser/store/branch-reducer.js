import axios from 'axios'

import {sortBy, areArraysEqual} from '../utility'

// initial state
const initialState = {branches: [], focus: null, sort: ['id'], reverse: false}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_BRANCHES:
      newState.branches = action.branches
      if (newState.sort) newState.branches.sort(sortBy(newState.sort, newState.reverse))
      return newState
    case FOCUS_BRANCH:
      newState.focus = action.index
      return newState
    case CREATE_BRANCH:
      newState.branches.push(action.branch)
      newState.focus = newState.branches.length - 1
      newState.branches[newState.focus].id = 'new'
      return newState
    case SORT_BRANCHES:
      if (areArraysEqual(newState.sort, action.field)) {
        newState.reverse = !newState.reverse
      } else {
        newState.reverse = false
        newState.sort = action.field
      }
      newState.branches.sort(sortBy(action.field, newState.reverse))
      return newState
    case FLUSH_BRANCHES:
      newState.branches = []
      newState.focus = null
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_BRANCHES = 'LOAD_BRANCHES'
export const loadBranches = (branches) => {
  return {type: LOAD_BRANCHES, branches}
}

const FOCUS_BRANCH = 'FOCUS_BRANCH'
export const focusBranch = (index) => {
  return {type: FOCUS_BRANCH, index}
}

const CREATE_BRANCH = 'CREATE_BRANCH'
export const createBranch = (branch) => {
  return {type: CREATE_BRANCH, branch}
}

const SORT_BRANCHES = 'SORT_BRANCHES'
export const sortBranches = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
  return {type: SORT_BRANCHES, field}
}

const FLUSH_BRANCHES = 'FLUSH_BRANCHES'
export const flushBranches = () => {
  return {type: FLUSH_BRANCHES}
}

// thunks
export const loadBranchesThunk = (token) => {
  return dispatch => {
    return axios.post('/api/branches', {token})
    .then(res => {
      dispatch(loadBranches(res.data))
    })
    .catch(err => console.error(err))
  }
}

export const saveBranchThunk = (token, branch) => {
  return dispatch => {
    return axios.put('/api/branches', {token, branch})
    .then(res => {
      dispatch(loadBranchesThunk(token))
      dispatch(focusBranch(null))
    })
    .catch(err => console.error(err))
  }
}

export const createBranchThunk = (token, branch) => {
  return dispatch => {
    return axios.post('/api/branches/new', {token, branch})
    .then(res => {
      dispatch(loadBranchesThunk(token))
      dispatch(focusBranch(null))
    })
    .catch(err => console.error(err))
  }
}

export default reducer