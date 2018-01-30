// initial state
const initialState = {alertQueue: []}

// reducer
const reducer = (prevState = initialState, action) => {
  let newState = Object.assign({}, prevState)
  switch (action.type) {
    case THROW_ALERT:
      // // not using push because react doesn't detect the change
      // newState.alertQueue = [...newState.alertQueue, action.alert]
      
      // changed this from a queue to a single entity, to avoid alert stacking; not ideal but fine for now
      newState.alertQueue = [action.alert]
      return newState
    case HANDLE_ALERT:
      newState.alertQueue = newState.alertQueue.slice(0, -1)
      return newState
    default:
      return newState
  }
}

// constants and action creators
const THROW_ALERT = 'THROW_ALERT'
export const throwAlert = (color, message) => {
  return {type: THROW_ALERT, alert: {color, message}}
}

const HANDLE_ALERT = 'HANDLE_ALERT'
export const handleAlert = () => {
  return {type: HANDLE_ALERT}
}


export default reducer