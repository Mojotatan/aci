import React from 'react'
import {Link} from 'react-router-dom'
import {getPrettyDate} from '../utility'

export default ({user, logOut}) => (
  <header>
    <div className="header-bar col-sm-12">
    <Link to='/applications'><div className="logo"></div></Link>
      <div className="contactus"><a href="tel:660-263-1029"><h4>Contact Us</h4></a></div>
    </div>
    <div className="second-header-bar col-sm-12">
      {(user) ?
        <div className="col-sm-6">
          <h3>Welcome, {user.fullName}</h3>
          <button onClick={logOut} className="logout-button">Log Out</button>
        </div>
        : null
      }
      <div className={`col-sm-6${(!user) ? ' col-sm-offset-6' : ''}`} align="right">
        <h3>{getPrettyDate()}</h3>
      </div>
    </div>
  </header>
)
