import React from 'react'
import {connect} from 'react-redux'

import axios from 'axios'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    apps: state.app.apps
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)