import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialiazeState = localStorage.getItem("state");
    if (serialiazeState === null) return undefined;
    return JSON.parse(serialiazeState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
