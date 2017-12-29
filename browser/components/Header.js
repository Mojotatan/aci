import React from 'react'
import {Link} from 'react-router-dom'
import { Script } from 'vm';

export default ({user, logOut}) => (
  <header>
    <div className="header-bar col-sm-12">
      <div className="logo"></div>
      <div className="contactus"><h4>Contact Us</h4></div>
    </div>
    <div className="second-header-bar col-sm-12">
      <h3>Welcome, {user.fullName}</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  </header>
)
