import axios from 'axios'

// initial state
const initialState = {byos: [], focus: null}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_BYOS:
      newState.byos = action.byos
      return newState
    case FOCUS_BYO:
      newState.focus = action.index
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

const FLUSH_BYOS = 'FLUSH_BYOS'
export const flushByos = () => {
  return {type: FLUSH_BYOS}
}

// thunks
export const loadByosThunk = (token) => {
  return dispatch => {
    return axios.post('/api/byos', {token})
    .then(res => {
      dispatch(loadByos(res.data.buyouts.map((elem, index) => {
        return Object.assign(elem, {leases: res.data.leases[index]})
      })))
    })
    .catch(err => console.error(err))
  }
}

export const saveByoThunk = (token, byo) => {
  return dispatch => {
    return axios.put('/api/byos', {token, byo})
    .then(res => {
      dispatch(loadByosThunk(token))
    })
    .catch(err => console.error(err))
  }
}

export default reducer