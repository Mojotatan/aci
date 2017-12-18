import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'

import saveDealerThunk from '../store/dealer-reducer'

import axios from 'axios'

class DealerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props.dealers, props.focus)

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
    //thunk
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <EditFields controller={this.focus} rows={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    dealers: state.dlr.dealers,
    focus: state.dlr.focus
  }
}

const mapDispatchToProps = {saveDealerThunk}

export default connect(mapStateToProps, mapDispatchToProps)(DealerContainer)