import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import LogIn from './LogIn'

// class App extends Component {
//   render() {
//     return(
//       <div>
//         <h1>React</h1>
//       </div>
//     )
//   }
// }

const App = () => (
  <div className="app">
    <main>
      <Link to='/login'><button>Log In</button></Link>
      <Route path="/login" component={LogIn} />
    </main>
  </div>
)

export default App