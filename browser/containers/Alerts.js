import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import Alert from '../components/Alert'

import {handleError} from '../store/error-reducer'

class AlertContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({})

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(e) {
    this.props.handleError()
  }

  render() {
    return(
      <Alert errors={this.props.errors} handleClose={this.handleClose} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.err.errQueue
  }
}

const mapDispatchToProps = {handleError}

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer)