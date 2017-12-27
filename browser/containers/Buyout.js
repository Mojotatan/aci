import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditBuyout from '../components/EditBuyout'

import {saveByoThunk, createByo} from '../store/buyout-reducer'

import {getDate} from '../utility'

class BuyoutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.byo && this.props.byo.customer) ? false : true,
        notifyRep: false
      },
      this.props.byo,
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeInCustomer = this.handleChangeInCustomer.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)
    this.handleNewLease = this.handleNewLease.bind(this)
    this.handleChangeInLease = this.handleChangeInLease.bind(this)
    this.toggleMachines = this.toggleMachines.bind(this)
    this.handleNewMachine = this.handleNewMachine.bind(this)
    this.handleChangeInMachine = this.handleChangeInMachine.bind(this)
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
      this.props.saveByoThunk(this.props.token, [this.state], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveByoThunk(this.props.token, [this.state], [this.state.customer])
    }

    if (this.state.notifyRep) {
      console.log('notifying rep!')
      axios.post('/api/byos/email', {token: this.props.token, rep: this.state.rep, customer: this.state.customer})
      .then(res => {
        console.log('mail sent', res.data)
      })
    }

    this.setState({
      notifyRep: false
    })

  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.customerCreate) {
      this.props.saveByoThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveByoThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer])
    }

    this.props.history.push('/Buyouts')
  }

  handleCheckbox(e) {
    this.setState({notifyRep: !this.state.notifyRep})
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

  handleChangeInLease(e) {
    let name = e.target.id.split('-')
    let leases = Array.from(this.state.leases)
    leases[name[0]][name[1]] = e.target.value
    this.setState({'leases': leases})
  }

  handleNewLease(e) {
    e.preventDefault()
    let leases = Array.from(this.state.leases)
    leases.push({
      id: 'new',
      number: '',
      company: '',
      amount: '',
      machines: [],
      buyoutId: this.state.id
    })
    this.setState({'leases': leases})
  }

  toggleMachines(e) {
    e.preventDefault()
    let index = e.target.id.split('-')[0]
    let leases = Array.from(this.state.leases)
    leases[index].displayMachines = !leases[index].displayMachines
    this.setState({
      'leases': leases
    })
  }

  handleChangeInMachine(e) {
    let name = e.target.id.split('-')
    let leases = Array.from(this.state.leases)
    leases[name[0]].machines[name[1]][name[2]] = e.target.value
    this.setState({'leases': leases})
  }

  handleNewMachine(e) {
    e.preventDefault()
    let index = e.target.id.slice('-')[0]
    let leases = Array.from(this.state.leases)
    if (!Array.isArray(leases[index].machines)) leases[index].machines = []
    leases[index].machines.push({
      id: 'new',
      serial: '',
      make: '',
      model: '', 
      location: '',
      LeaseId: leases[index].id
    })
    this.setState({'leases': leases})
  }


  componentWillReceiveProps(newProps){
    console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.byo && newProps.byo.customer) ? false : true,
    })
    this.setState(newProps.byo)
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
  }


  render() {
    return(
      <div>
        <EditBuyout
          values={this.state}
          iAmAuthor={this.props.user.email === this.state.rep.email}
          admin={this.props.user.level === 'Admin'}
          customers={this.props.customers.map(customer => customer.name)}
          handleChange={this.handleChange}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={this.handleSave}
          handleSubmit={this.handleSubmit}
          handleChangeCustomer={this.handleChangeCustomer}
          handleCheckbox={this.handleCheckbox}
          handleNewLease={this.handleNewLease}
          handleChangeInLease={this.handleChangeInLease}
          toggleMachines={this.toggleMachines}
          handleNewMachine={this.handleNewMachine}
          handleChangeInMachine={this.handleChangeInMachine}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    user: state.login.user,
    byo: state.byo.byos[state.byo.focus],
    customers: state.customer.customers
  }
}

const mapDispatchToProps = {saveByoThunk, createByo}

export default connect(mapStateToProps, mapDispatchToProps)(BuyoutContainer)