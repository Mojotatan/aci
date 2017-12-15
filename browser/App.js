import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './containers/LogIn'
import Home from './containers/Home'
import Applications from './containers/Applications'
import Application from './containers/Application'
import MyAccount from './containers/Account'


const App = () => (
  <div className="app">
    <main>
      <LogIn />
      <Route path="/home" component={Home} />
      <Route path="/my-account" component={MyAccount} />
      <Route path="/applications" component={Applications} />
      <Route path="/edit-application" component={Application} />
    </main>
  </div>
)

export default App