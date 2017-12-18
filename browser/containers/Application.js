import React from 'react'
import {connect} from 'react-redux'

import EditApplication from '../components/EditApplication'

import {saveAppThunk} from '../store/app-reducer'

import axios from 'axios'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props.app)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSave(e) {
    e.preventDefault()

    this.props.saveAppThunk(this.props.token, this.state)

    // this.props.history.push('/applications')
  }

  handleSubmit(e) {
    this.setState({
      status: 'new'
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <EditApplication values={this.state} handleChange={this.handleChange} handleSave={this.handleSave} handleSubmit={this.handleSubmit} />
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

const mapDispatchToProps = {saveAppThunk}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)