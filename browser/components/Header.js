import React from 'react'
import {Link} from 'react-router-dom'

export default ({user, logOut}) => (
  <header>
    <h3>MyAdmin Central</h3>
    <div>
      <h3>Welcome, {user}</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
    <Link to='/applications'><h4>Applications</h4></Link>
    <Link to='/dealers'><h4>Dealers</h4></Link>
  </header>
)