import React from 'react'
import {connect} from 'react-redux'

import EditAccount from '../components/EditAccount'

import axios from 'axios'

class AccountContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    
    this.props.history.push('/home')
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <EditAccount values={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    app: state.app.apps[state.app.focus]
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)