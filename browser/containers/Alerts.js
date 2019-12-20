import React from 'react'
import {connect} from 'react-redux'

import Alert from '../components/Alert'

import {handleAlert} from '../store/alert-reducer'

class AlertContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({})

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(e) {
    this.props.handleAlert()
  }

  render() {
    return(
      <Alert alerts={this.props.alerts} handleClose={this.handleClose} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert.alertQueue
  }
}

const mapDispatchToProps = {handleAlert}

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer)