import axios from 'axios'

// initial state
const initialState = {leases: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_LEASES:
      newState.leases = action.leases
      return newState
    case FLUSH_LEASES:
      newState.leases = []
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_LEASES = 'LOAD_LEASES'
export const loadLeases = (leases) => {
  let dupes = ['EverBank', 'DLL', 'Wells', 'USB', 'CIT', 'Marlin', 'Balboa', 'EMR', 'Leaf', 'Great America', 'PNC']
  let uniqueLeases = leases.filter(lse => {
    if (dupes.includes(lse)) return false
    else {
      dupes.push(lse)
      return true
    }
  })
  return {type: LOAD_LEASES, leases: uniqueLeases}
}

const FLUSH_LEASES = 'FLUSH_LEASES'
export const flushLeases = () => {
  return {type: FLUSH_LEASES}
}

// thunks
export const loadLeasesThunk = (token) => {
  return dispatch => {
    return axios.post('/api/leases/companies', {token})
    .then(res => {
      dispatch(loadLeases(res.data))
    })
    .catch(err => console.error(err))
  }
}

export default reducer