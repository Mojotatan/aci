import React from 'react'
import {Link} from 'react-router-dom'

export default ({user, logOut}) => (
  <header>
    <h3>MyAdmin Central</h3>
    <div>
      <h3>Welcome, {user.fullName}</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  </header>
)