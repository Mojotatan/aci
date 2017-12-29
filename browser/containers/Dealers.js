import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'

import {loadDealersThunk, saveDealerThunk, createDealerThunk, createDealer, focusDealer} from '../store/dealer-reducer'

import axios from 'axios'

class DealerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {create: false,
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: ''}
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleController = this.handleController.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(e) {
    let [index, field] = e.target.name.split('-')

    this.setState({
      [e.target.name.split('-')[1]]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.create) {
      this.props.createDealerThunk(this.props.token, {
        name: this.state.name,
        phone: this.state.phone,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
    } else {
      this.setState({create: false})
      this.props.saveDealerThunk(this.props.token, {
        id: this.props.dealers[this.props.focus].id,
        name: this.state.name,
        phone: this.state.phone,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
    }
  }

  handleCancel(e) {
    this.setState({create: false})
    this.props.focusDealer(null)
    this.props.loadDealersThunk(this.props.token)
  }

  handleController(e) {
    // this.setState({focus: e.target.value})
    this.props.focusDealer(e.target.value)
    this.setState({
      name: this.props.dealers[e.target.value].name,
      phone: this.props.dealers[e.target.value].phone,
      street: this.props.dealers[e.target.value].street,
      city: this.props.dealers[e.target.value].city,
      state: this.props.dealers[e.target.value].state,
      zip: this.props.dealers[e.target.value].zip
    })
  }

  handleCreate(e) {
    this.setState({
      create: true,
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    })
    this.props.createDealer({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  handleDelete(e) {
    e.preventDefault()
    
    axios.put('/api/dealers/delete', {token: this.props.token, dealer: e.target.value})
    .then(res => {
      this.props.loadDealersThunk(this.props.token)
    })
    .catch(err => console.error(err))
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  componentWillReceiveProps() {
    // console.log('props received', this.state)
  }

  render() {
    return(
      <div>
        <EditFields
          controller={this.props.focus}
          fields={{
            name: this.state.name,
            phone: this.state.phone,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
          }}
          dropdowns={{}}
          rows={this.props.dealers}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleController={this.handleController}
          handleCreate={this.handleCreate}
          handleDelete={this.handleDelete}
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

const mapDispatchToProps = {loadDealersThunk, saveDealerThunk, createDealerThunk, createDealer, focusDealer}

export default connect(mapStateToProps, mapDispatchToProps)(DealerContainer)