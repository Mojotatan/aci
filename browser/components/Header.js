import React from 'react'
import {Link} from 'react-router-dom'

export default ({user, logOut}) => (
  <header>
    <h2>MyAdmin Central</h2>
    <Link to='/applications'>Applications</Link>
    <div>
      <h2>Welcome, {user}</h2>
      <button onClick={logOut}>Log Out</button>
    </div>
  </header>
)