import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'

import {loadRegionsThunk, saveRegionThunk, createRegionThunk, createRegion, focusRegion} from '../store/region-reducer'

import axios from 'axios'

class RegionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      props.region,
      {create: false,
      name: ''}
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
      this.props.createRegionThunk(this.props.token, {
        name: this.state.name
      })
    } else {
      this.setState({create: false})
      this.props.saveRegionThunk(this.props.token, {
        id: this.props.regions[this.props.focus].id,
        name: this.state.name
      })
    }
  }

  handleCancel(e) {
    this.setState({create: false})
    this.props.focusRegion(null)
    this.props.loadRegionsThunk(this.props.token)
  }

  handleController(e) {
    // this.setState({focus: e.target.value})
    this.props.focusRegion(e.target.value)
    this.setState({
      name: this.props.regions[e.target.value].name
    })
  }

  handleCreate(e) {
    this.setState({
      create: true,
      name: '',
    })
    this.props.createRegion({
      name: '',
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
          }}
          rows={this.props.regions}
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
    regions: state.region.regions,
    focus: state.region.focus
  }
}

const mapDispatchToProps = {loadRegionsThunk, saveRegionThunk, createRegionThunk, createRegion, focusRegion}

export default connect(mapStateToProps, mapDispatchToProps)(RegionContainer)