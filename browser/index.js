import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
// import {Router} from 'react-router-dom'
// import {createBrowserHistory} from 'history'
import {Provider} from 'react-redux'
import store from './store'

import App from './App'

render(
  (
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>
  ), document.getElementById('app'))
