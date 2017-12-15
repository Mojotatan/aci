import React from 'react'
import {Link} from 'react-router-dom'

export default ({user, logOut}) => (
  <header>
    <Link to='/home'><h3>MyAdmin Central</h3></Link>
    <Link to='/applications'><h4>Applications</h4></Link>
    <div>
      <h3>Welcome, <Link to='/yomammashouse'>{user}</Link></h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  </header>
)