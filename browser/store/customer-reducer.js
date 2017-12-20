import axios from 'axios'

// initial state
const initialState = {customers: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case LOAD_CUSTOMERS:
      newState.customers = action.customers
      return newState
    case FLUSH_CUSTOMERS:
      newState.customers = []
      return newState
    default:
      return newState
  }
}

// constants and action creators
const LOAD_CUSTOMERS = 'LOAD_CUSTOMERS'
export const loadCustomers = (customers) => {
  return {type: LOAD_CUSTOMERS, customers}
}

const FLUSH_CUSTOMERS = 'FLUSH_CUSTOMERS'
export const flushCustomers = () => {
  return {type: FLUSH_CUSTOMERS}
}

// thunks
export const loadCustomersThunk = (token) => {
  return dispatch => {
    return axios.post('/api/customers', {token})
    .then(res => {
      dispatch(loadCustomers(res.data))
    })
    .catch(err => console.error(err))
  }
}

// export const saveCustomerThunk = (token, customer) => {
//   return dispatch => {
//     return axios.put('/api/customers', {token, customer})
//     .then(res => {
//       dispatch(loadCustomersThunk(token))
//     })
//     .catch(err => console.error(err))
//   }
// }

// export const createCustomerThunk = (token, customer) => {
//   return dispatch => {
//     return axios.post('/api/customers/new', {token, customer})
//     .then(res => {
//       dispatch(loadCustomersThunk(token))
//     })
//     .catch(err => console.error(err))
//   }
// }

export default reducer