import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'

import {loadDealersThunk, saveDealerThunk, updateDealer, focusDealer} from '../store/dealer-reducer'

import axios from 'axios'

class DealerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, props.dlrs, {name: ''}, {phone: ''})

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleController = this.handleController.bind(this)
  }

  handleChange(e) {
    let [index, field] = e.target.name.split('-')

    // this.props.updateDealer(index, field, e.target.value)

    // let theNewDeal = Object.assign({}, this.state.dealers)
    // theNewDeal[index][field] = e.target.value

    // this.setState(theNewDeal)

    this.setState({
      [e.target.name.split('-')[1]]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    //thunk
  }

  handleCancel(e) {
    // this.setState({focus: null})
    this.props.focusDealer(null)
    this.props.loadDealersThunk(this.props.token)
  }

  handleController(e) {
    // this.setState({focus: e.target.value})
    this.props.focusDealer(e.target.value)
    this.setState({
      name: this.props.dealers[e.target.value].name,
      phone: this.props.dealers[e.target.value].phone
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <EditFields
          controller={this.props.focus}
          fields={{name: this.state.name, phone: this.state.phone}}
          rows={this.props.dealers}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleController={this.handleController}
        />
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

const mapDispatchToProps = {loadDealersThunk, saveDealerThunk, updateDealer, focusDealer}

export default connect(mapStateToProps, mapDispatchToProps)(DealerContainer)