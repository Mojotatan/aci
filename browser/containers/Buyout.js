import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditBuyout from '../components/EditBuyout'

import {saveByoThunk, loadByosThunk, deleteByoThunk, createByo} from '../store/buyout-reducer'
import {throwAlert} from '../store/alert-reducer'

import {getDate, reformatDate} from '../utility'

class BuyoutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.byo && this.props.byo.customer) ? false : true,
        upload: null
      },
      this.props.byo,
    )

    this.handleChange = this.handleChange.bind(this)

    this.handleChangeInCustomer = this.handleChangeInCustomer.bind(this)
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)
    
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    
    this.handleNewLease = this.handleNewLease.bind(this)
    this.handleChangeInLease = this.handleChangeInLease.bind(this)
    this.handleRemoveLease = this.handleRemoveLease.bind(this)
    
    this.toggleMachines = this.toggleMachines.bind(this)
    this.handleNewMachine = this.handleNewMachine.bind(this)
    this.handleChangeInMachine = this.handleChangeInMachine.bind(this)
    this.handleRemoveMachine = this.handleRemoveMachine.bind(this)

    this.handleChoosePDF = this.handleChoosePDF.bind(this)
    this.handleUploadPDF = this.handleUploadPDF.bind(this)
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

  handleChangeCustomer(e) {
    let name = e.target.value
    let fill = this.props.customers.filter(customer => {
      return customer.name === name
    })
    if (fill.length > 0) {
      this.setState({
        customer: fill[0]
      })
    } else {
      this.setState({
        customer: Object.assign(
          {}, this.state.customer, {name}
        )
      })
    }
  }

  handleSave(e) {
    e.preventDefault()

    if (this.state.customerCreate) {
      this.props.saveByoThunk(this.props.token, [this.state], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveByoThunk(this.props.token, [this.state], [this.state.customer])
    }

  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.state.customer || !this.state.customer.name || !this.state.customer.street || !this.state.customer.city || !this.state.customer.state || !this.state.customer.zip || !this.state.customer.phone) {
      this.props.throwAlert('red', 'Please fill in all required fields')
    } else {
      
      if (this.state.customerCreate) {
        this.props.saveByoThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer, {id: 'new'}])
      } else {
        this.props.saveByoThunk(this.props.token, [this.state, {status: 'Submitted', date: getDate()}], [this.state.customer])
      }

      this.props.history.push('/Buyouts')
    }
  }

  handleDelete(e) {
    e.preventDefault()
    if (this.state.id === 'new') {
      this.props.loadByosThunk(this.props.token, () => {this.props.history.push('/buyouts')})
      this.props.throwAlert('green', 'Your buyout has been deleted')
    } else {
      this.props.deleteByoThunk(this.props.token, this.state.id, () => {this.props.history.push('/buyouts')})
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
      machines: [],
      buyoutId: this.state.id
    })
    this.setState({'leases': leases})
  }

  handleRemoveLease(e) {
    e.preventDefault()
    let leases = Array.from(this.state.leases)
    // leases = [...leases.slice(0, e.target.value), ...leases.slice(e.target.value + 1)]
    leases[e.target.value].delete = true
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

  handleRemoveMachine(e) {
    e.preventDefault()
    let index = e.target.value.split('-')
    let leases = Array.from(this.state.leases)
    leases[index[0]].machines[index[1]].delete = true
    this.setState({'leases': leases})
  }

  handleChoosePDF(e) {
    this.setState({upload: e.target.files[0]})
  }

  handleUploadPDF(e) {
    e.preventDefault()
    if (this.state.upload) {
      let formData = new FormData()
      formData.append('file', this.state.upload)
      axios.post(`/api/uploads/pdf/${this.state.id}?access_token=${this.props.token}`, formData, {'content-type': 'multipart/form-data'})
      .then(res => {
        if (res.data.color) this.props.throwAlert(res.data.color, res.data.message)
        else console.log(res.data)
        this.props.loadByosThunk(this.props.token)
      })
      .catch(err => {
        console.error(err)
      })
      this.setState({upload: null})
    }
  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.byo && newProps.byo.customer) ? false : true,
    })
    this.setState(newProps.byo)
    this.setState({
      date: reformatDate(newProps.byo.date),
      expiry: reformatDate(newProps.byo.expiry)
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
    this.setState({
      date: reformatDate(this.state.date),
      expiry: reformatDate(this.state.expiry)
    })
  }


  render() {
    return(
      <div>
        <EditBuyout
          values={this.state}
          token={this.props.token} // token needed to make request for pdf -- not preferable
          iAmAuthor={(this.props.user) ? this.props.user.email === this.state.rep.email : false}
          admin={(this.props.user) ? this.props.user.level === 'Admin' : false}
          customers={(this.props.customers) ? this.props.customers.map(customer => customer.name) : null}
          count={1} // for numbering leases
          handleChange={this.handleChange}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={this.handleSave}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleChangeCustomer={this.handleChangeCustomer}
          handleNewLease={this.handleNewLease}
          handleChangeInLease={this.handleChangeInLease}
          handleRemoveLease={this.handleRemoveLease}
          toggleMachines={this.toggleMachines}
          handleNewMachine={this.handleNewMachine}
          handleChangeInMachine={this.handleChangeInMachine}
          handleRemoveMachine={this.handleRemoveMachine}
          handleChoosePDF={this.handleChoosePDF}
          handleUploadPDF={this.handleUploadPDF}
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

const mapDispatchToProps = {saveByoThunk, loadByosThunk, deleteByoThunk, createByo, throwAlert}

export default connect(mapStateToProps, mapDispatchToProps)(BuyoutContainer)