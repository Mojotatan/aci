import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./user-reducer').default
})

export default rootReducer