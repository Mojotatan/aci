import React from 'react'
import {Link} from 'react-router-dom'

export default ({user, logOut}) => (
  <header>
    <h3>MyAdmin Central</h3>
    <div>
      <h3>Welcome, {user.name}</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
    <Link to='/applications'><h4>Applications</h4></Link>

    {(user.level === 'Admin') ? 
    <Link to='/dealers'><h4>Dealers</h4></Link>
    : null}

    {(user.level === 'Admin') ? 
    <Link to='/branches'><h4>Branches</h4></Link>
    : null}

    {(user.level === 'Admin') ? 
    <Link to='/regions'><h4>Regions</h4></Link>
    : null}
  </header>
)