import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './containers/LogIn'
import Applications from './containers/Applications'
import Application from './containers/Application'


const App = () => (
  <div className="app">
    <main>
      <LogIn />
      <Route path="/applications" component={Applications} />
      <Route path="/edit-application" component={Application} />
    </main>
  </div>
)

export default App