import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  login: require('./login-reducer').default,
  user: require('./user-reducer').default,
  app: require('./app-reducer').default
})

export default rootReducer