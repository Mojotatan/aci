import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './containers/LogIn'
import Applications from './containers/ApplicationDashboard'
import Application from './containers/Application'
import Buyouts from './containers/BuyoutDashboard'
import Buyout from './containers/Buyout'
import Dealers from './containers/DealerDashboard'
import Branches from './containers/BranchDashboard'
import Regions from './containers/RegionDashboard'
import Users from './containers/UserDashboard'
import User from './containers/User'
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
      <Route path="/users" component={Users} />
      <Route path="/edit-user" component={User} />
      <Route path="/dealers" component={Dealers} />
      <Route path="/branches" component={Branches} />
      <Route path="/regions" component={Regions} />
    </main>
  </div>
)

export default App