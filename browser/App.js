import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './containers/LogIn'
import Applications from './containers/Applications'
import Application from './containers/Application'
import Buyouts from './containers/Buyouts'
import Buyout from './containers/Buyout'
import Dealers from './containers/Dealers'
import Branches from './containers/Branches'
import Regions from './containers/Regions'
import Alerts from './containers/Alerts'


const App = () => (
  <div className="app">
    <main>
      <Alerts />
      <LogIn />
      <Route path="/applications" component={Applications} />
      <Route path="/edit-application" component={Application} />
      <Route path="/buyouts" component={Buyouts} />
      <Route path="/edit-buyout" component={Buyout} />
      <Route path="/dealers" component={Dealers} />
      <Route path="/branches" component={Branches} />
      <Route path="/regions" component={Regions} />
    </main>
  </div>
)

export default App