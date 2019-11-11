import React from 'react'
import {connect} from 'react-redux'

import EditFields from '../components/EditFields'
import Menu from './Menu'

import {loadDealersThunk, saveDealerThunk, createDealerThunk, createDealer, sortDealers, focusDealer} from '../store/dealer-reducer'

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
      zip: '',
      logo: '',
      upload: null}
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleChoosePDF = this.handleChoosePDF.bind(this)
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

  handleChoosePDF(e) {
    this.setState({upload: e.target.files[0]})
  }

  handleSubmit(e) {
    e.preventDefault()
    let formData, callback

    if (this.state.upload) {
      formData = new FormData()
      formData.append('file', this.state.upload)
      callback = id => {
        axios.post(`/api/uploads/logo/${id}?access_token=${this.props.token}`, formData, {'content-type': 'multipart/form-data'})
        .then(res => {
          if (res.data.color) this.props.throwAlert(res.data.color, res.data.message)
          // else console.log(res.data)
          this.props.loadDealersThunk(this.props.token)
        })
        .catch(err => {
          console.error(err)
        })
      }
    }
    
    if (this.state.create) {
      this.props.createDealerThunk(this.props.token, {
        name: this.state.name,
        phone: this.state.phone,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }, callback)
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
      }, callback)
    }
  }

  handleCancel(e) {
    this.setState({create: false, upload: null})
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
      zip: '',
      logo: ''
    })
    this.props.createDealer({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      logo: ''
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

  handleSort(e) {
    // need to cancel any open forms b/c otherwise there are unintended side effects
    if (this.props.focus) this.handleCancel()
    this.props.sortDealers(e.target.id.split('-'))
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else this.props.loadDealersThunk(this.props.token)
  }

  componentWillReceiveProps() {
    // console.log('props received', this.state)
  }

  render() {
    // console.log(this.props)
    return(
      <div className="ex-table">
        <Menu />
        <EditFields
          uniClass="dealer"
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
          uploads={{
            logo: this.state.logo
          }}
          rows={this.props.dealers}
          handleChange={this.handleChange}
          handleChoosePDF={this.handleChoosePDF}
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
    dealers: state.dlr.dealers,
    focus: state.dlr.focus,
    sort: state.dlr.sort,
    reverse: state.dlr.reverse
  }
}

const mapDispatchToProps = {loadDealersThunk, saveDealerThunk, createDealerThunk, createDealer, sortDealers, focusDealer}

export default connect(mapStateToProps, mapDispatchToProps)(DealerContainer)