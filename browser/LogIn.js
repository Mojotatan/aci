import React from 'react'
import {connect} from 'react-redux'
import {logInToken} from './store/login-reducer'

import axios from 'axios'

class LogInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logMeIn = this.logMeIn.bind(this)
  }

  logMeIn(e) {
    // e.preventDefault()
    console.log('yeeeeeeeee')
    axios.post('/api/login', {id: 2})
    .then((res) => {
      console.log('promise achieved', res.data)
      this.props.logInToken(res.data)
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <h1>Log in plz</h1>
        <button onClick={this.logMeIn}>click here</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {}
}

const mapDispatchToProps = {logInToken}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer)