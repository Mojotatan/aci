import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  login: require('./login-reducer').default,
  user: require('./user-reducer').default,
  users: require('./users-reducer').default,
  app: require('./app-reducer').default,
  byo: require('./buyout-reducer').default,
  dlr: require('./dealer-reducer').default,
  branch: require('./branch-reducer').default,
  region: require('./region-reducer').default,
  customer: require('./customer-reducer').default,
  alert: require('./alert-reducer').default
})

export default rootReducer