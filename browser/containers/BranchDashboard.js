import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'
import Menu from './Menu'

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
      zip: '',
      dealerName: '',
      regionName: ''}
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
      this.props.createBranchThunk(this.props.token, {
        name: this.state.name,
        phone: this.state.phone,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        dealerName: this.state.dealerName,
        regionName: this.state.regionName
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
        zip: this.state.zip,
        dealerName: this.state.dealerName,
        regionName: this.state.regionName
      })
    }
  }

  handleCancel(e) {
    this.setState({create: false, dealerName: '', regionName: ''})
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
      zip: this.props.branches[e.target.value].zip,
      dealerName: (this.props.branches[e.target.value].dealer) ? this.props.branches[e.target.value].dealer.name : '',
      regionName: (this.props.branches[e.target.value].region) ? this.props.branches[e.target.value].region.name : ''
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
      zip: '',
      dealerName: '',
      regionName: ''
    })
    this.props.createBranch({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      dealerName: '',
      regionName: ''
    })
  }

  handleDelete(e) {
    e.preventDefault()
    
    axios.put('/api/branches/delete', {token: this.props.token, branch: e.target.value})
    .then(res => {
      this.props.loadBranchesThunk(this.props.token)
    })
    .catch(err => console.error(err))
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else this.props.loadBranchesThunk(this.props.token)
  }

  componentWillReceiveProps() {
    // console.log('props received', this.state)
  }

  render() {
    return(
      <div className="ex-table">
        <Menu />
        <EditFields
          uniClass="branch"
          controller={this.props.focus}
          fields={{
            name: this.state.name,
            phone: this.state.phone,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
          }}
          dropdowns={{
            dealerName: {
              values: this.props.dealers.map(dlr => dlr.name),
              match: ['dealer', 'name'],
              select: this.state.dealerName
            },
            regionName: {
              values: this.props.regions.filter(reg => {if (reg.dealer) {return reg.dealer.name === this.state.dealerName} else return false}).map(reg => reg.name),
              match: ['region', 'name'],
              select: this.state.regionName
            }
          }}
          rows={this.props.branches}
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
    branches: state.branch.branches,
    focus: state.branch.focus,
    dealers: state.dlr.dealers,
    regions: state.region.regions
  }
}

const mapDispatchToProps = {loadBranchesThunk, saveBranchThunk, createBranchThunk, createBranch, focusBranch}

export default connect(mapStateToProps, mapDispatchToProps)(BranchContainer)