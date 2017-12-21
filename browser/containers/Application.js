import React from 'react'
import {connect} from 'react-redux'

import EditApplication from '../components/EditApplication'

import {saveAppThunk, createApp} from '../store/app-reducer'

import {getDate} from '../utility'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.app && this.props.app.customer) ? false : true
      },
      this.props.app,
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeInCustomer = this.handleChangeInCustomer.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)
  }

  handleChange(e) {
    // console.log('state', this.state)
    // console.log('props', this.props)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeInCustomer(e) {
    this.setState({
      customer: Object.assign(
        {}, this.state.customer,
        {[e.target.name]: e.target.value}
      )
    })
  }

  handleSave(e) {
    e.preventDefault()

    if (this.state.customerCreate) {
      this.props.saveAppThunk(this.props.token, [this.state], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveAppThunk(this.props.token, [this.state], [this.state.customer])
    }

  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.customerCreate) {
      this.props.saveAppThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveAppThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer])
    }

    this.props.history.push('/applications')
  }

  handleChangeCustomer(e) {
    if (e.target.value === 'new') {
      this.setState({
        customerCreate: true,
        customer: {
          name: '',
          phone: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          taxID: ''
        }
      })
    } else {
      let select = this.props.customers.filter(customer => 
        (customer.name === e.target.value)
      )[0]
      this.setState({
        customerCreate: false,
        customer: select
      })
    }
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
  }

  // componentWillReceiveProps() {
    // console.log('state', this.state)
  //   console.log('props', this.props)
  // }

  render() {
    return(
      <div>
        <EditApplication
          values={this.state}
          iAmAuthor={this.props.user.email === this.state.rep.email}
          admin={this.props.user.level === 'Admin'}
          customers={this.props.customers.map(customer => customer.name)}
          handleChange={this.handleChange}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={this.handleSave}
          handleSubmit={this.handleSubmit}
          handleChangeCustomer={this.handleChangeCustomer}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    user: state.login.user,
    app: state.app.apps[state.app.focus],
    customers: state.customer.customers
  }
}

const mapDispatchToProps = {saveAppThunk, createApp}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)