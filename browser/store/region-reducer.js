import axios from 'axios'

import {sortBy, areArraysEqual} from '../utility'

// initial state
const initialState = {regions: [], focus: null, sort: ['id'], reverse: false}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_REGIONS:
      newState.regions = action.regions
      if (newState.sort) newState.regions.sort(sortBy(newState.sort, newState.reverse))
      return newState
    case FOCUS_REGION:
      newState.focus = action.index
      return newState
    case CREATE_REGION:
      newState.regions.push(action.region)
      newState.focus = newState.regions.length - 1
      newState.regions[newState.focus].id = 'new'
      return newState
    case FLUSH_REGIONS:
      newState.regions = []
      newState.focus = null
      return newState
    case SORT_REGIONS:
      if (areArraysEqual(newState.sort, action.field)) {
        newState.reverse = !newState.reverse
      } else {
        newState.reverse = false
        newState.sort = action.field
      }
      newState.regions.sort(sortBy(action.field, newState.reverse))
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_REGIONS = 'LOAD_REGIONS'
export const loadRegions = (regions) => {
  return {type: LOAD_REGIONS, regions}
}

const FOCUS_REGION = 'FOCUS_REGION'
export const focusRegion = (index) => {
  return {type: FOCUS_REGION, index}
}

const CREATE_REGION = 'CREATE_REGION'
export const createRegion = (region) => {
  return {type: CREATE_REGION, region}
}

const SORT_REGIONS = 'SORT_REGIONS'
export const sortRegions = (fieldArg) => {
  let field = (typeof fieldArg === 'string') ? [fieldArg] : fieldArg
  return {type: SORT_REGIONS, field}
}

const FLUSH_REGIONS = 'FLUSH_REGIONS'
export const flushRegions = () => {
  return {type: FLUSH_REGIONS}
}

// thunks
export const loadRegionsThunk = (token) => {
  return dispatch => {
    return axios.post('/api/regions', {token})
    .then(res => {
      dispatch(loadRegions(res.data))
    })
    .catch(err => console.error(err))
  }
}

export const saveRegionThunk = (token, region) => {
  return dispatch => {
    return axios.put('/api/regions', {token, region})
    .then(res => {
      dispatch(loadRegionsThunk(token))
      dispatch(focusRegion(null))
    })
    .catch(err => console.error(err))
  }
}

export const createRegionThunk = (token, region) => {
  return dispatch => {
    return axios.post('/api/regions/new', {token, region})
    .then(res => {
      dispatch(loadRegionsThunk(token))
      dispatch(focusRegion(null))
    })
    .catch(err => console.error(err))
  }
}

export default reducer