import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './containers/LogIn'
import Applications from './containers/Applications'


const App = () => (
  <div className="app">
    <main>
      <LogIn />
      <Route path="/applications" component={Applications} />
    </main>
  </div>
)

export default App