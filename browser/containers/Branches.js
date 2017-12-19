import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'

import {loadBranchesThunk, saveBranchThunk, createBranchThunk, createBranch, focusBranch} from '../store/branch-reducer'

import axios from 'axios'

class BranchContainer extends React.Component {
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
      this.props.createBranchThunk(this.props.token, {
        name: this.state.name,
        phone: this.state.phone,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
    } else {
      this.setState({create: false})
      this.props.saveBranchThunk(this.props.token, {
        id: this.props.branches[this.props.focus].id,
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
    this.props.focusBranch(null)
    this.props.loadBranchesThunk(this.props.token)
  }

  handleController(e) {
    // this.setState({focus: e.target.value})
    this.props.focusBranch(e.target.value)
    this.setState({
      name: this.props.branches[e.target.value].name,
      phone: this.props.branches[e.target.value].phone,
      street: this.props.branches[e.target.value].street,
      city: this.props.branches[e.target.value].city,
      state: this.props.branches[e.target.value].state,
      zip: this.props.branches[e.target.value].zip
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
    this.props.createBranch({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  componentWillReceiveProps() {
    console.log('props received', this.state)
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
          rows={this.props.branches}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleController={this.handleController}
          handleCreate={this.handleCreate}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    branches: state.branch.branches,
    focus: state.branch.focus
  }
}

const mapDispatchToProps = {loadBranchesThunk, saveBranchThunk, createBranchThunk, createBranch, focusBranch}

export default connect(mapStateToProps, mapDispatchToProps)(BranchContainer)