import React from 'react'
import {connect} from 'react-redux'

class LogInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logMeIn = this.logMeIn.bind(this)
  }

  logMeIn(e) {
    // e.preventDefault()
    console.log('yeeeeeeeee')
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer)