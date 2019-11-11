import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'
import Menu from './Menu'

import {loadRegionsThunk, saveRegionThunk, createRegionThunk, createRegion, sortRegions, focusRegion} from '../store/region-reducer'

import axios from 'axios'

class RegionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {create: false,
      name: '',
      dealerName: ''}
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleController = this.handleController.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  handleChange(e) {
    let name = e.target.name.split('-')
    if (name.length > 2) name[2] = name[2][0].toUpperCase() + name[2].slice(1)
    this.setState({
      [name.slice(1).join('')]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.create) {
      this.props.createRegionThunk(this.props.token, {
        name: this.state.name,
        dealerName: this.state.dealerName
      })
    } else {
      this.setState({create: false})
      this.props.saveRegionThunk(this.props.token, {
        id: this.props.regions[this.props.focus].id,
        name: this.state.name,
        dealerName: this.state.dealerName
      })
    }
  }

  handleCancel(e) {
    this.setState({create: false, dealerName: ''})
    this.props.focusRegion(null)
    this.props.loadRegionsThunk(this.props.token)
  }

  handleController(e) {
    // this.setState({focus: e.target.value})
    this.props.focusRegion(e.target.value)
    this.setState({
      name: this.props.regions[e.target.value].name,
      dealerName: (this.props.regions[e.target.value].dealer) ? this.props.regions[e.target.value].dealer.name : ''
    })
  }

  handleCreate(e) {
    this.setState({
      create: true,
      name: '',
      dealerName: ''
    })
    this.props.createRegion({
      name: '',
      dealerName: ''
    })
  }

  handleDelete(e) {
    e.preventDefault()
    
    axios.put('/api/regions/delete', {token: this.props.token, region: e.target.value})
    .then(res => {
      this.props.loadRegionsThunk(this.props.token)
    })
    .catch(err => console.error(err))
  }

  handleSort(e) {
    // need to cancel any open forms b/c otherwise there are unintended side effects
    if (this.props.focus) this.handleCancel()
    this.props.sortRegions(e.target.id.split('-'))
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else this.props.loadRegionsThunk(this.props.token)
  }

  // componentWillReceiveProps() {
  //   console.log('props received', this.state, this.props)
  // }

  render() {
    return(
      <div className="ex-table">
        <Menu />
        <EditFields
          uniClass="region"
          controller={this.props.focus}
          fields={{
            name: this.state.name,
          }}
          dropdowns={{
            'dealer-name': {
              values: this.props.dealers.map(dlr => dlr.name),
              match: ['dealer', 'name'],
              select: this.state.dealerName
            }
          }}
          uploads={{}}
          rows={this.props.regions}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleController={this.handleController}
          handleCreate={this.handleCreate}
          handleDelete={this.handleDelete}
          handleSort={this.handleSort}
          reverse={this.props.reverse}
          sort={this.props.sort}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    regions: state.region.regions,
    focus: state.region.focus,
    sort: state.region.sort,
    reverse: state.region.reverse,
    dealers: state.dlr.dealers
  }
}

const mapDispatchToProps = {loadRegionsThunk, saveRegionThunk, createRegionThunk, createRegion, sortRegions, focusRegion}

export default connect(mapStateToProps, mapDispatchToProps)(RegionContainer)