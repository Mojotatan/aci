import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditApplication from '../components/EditApplication'

import {saveAppThunk, createApp} from '../store/app-reducer'
import {throwAlert} from '../store/alert-reducer'

import {getDate, checkFor$} from '../utility'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.app && this.props.app.customer) ? false : true,
        notifyRep: false,
        mailBody: '',
        mailSubject: '',
        mailCC: '',
        mailDisabled: false
      },
      this.props.app,
    )

    this.handleChange = this.handleChange.bind(this)

    this.handleRemoveLease = this.handleRemoveLease.bind(this)
    this.handleChangeInLease = this.handleChangeInLease.bind(this)
    this.handleAddLease = this.handleAddLease.bind(this)

    this.handleChangeInCustomer = this.handleChangeInCustomer.bind(this)
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)

    this.handleChangeInTerm = this.handleChangeInTerm.bind(this)
    
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleCheckbox = this.handleCheckbox.bind(this)

    this.handleNotify = this.handleNotify.bind(this)
    
    this.handleNote = this.handleNote.bind(this)
    this.handleChangeAction = this.handleChangeAction.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }

  handleChange(e) {
    // console.log('state', this.state)
    // console.log('props', this.props)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeInLease(e) {
    let name = e.target.name.split('-')
    let leases = Array.from(this.state[name[0]])
    leases[Number(name[1])] = e.target.value
    this.setState({
      [name[0]]: leases
    })
  }
  
  handleRemoveLease(e) {
    e.preventDefault()

    let index = Number(e.target.name)
    
    this.setState({
      leaseCompany: [...this.state.leaseCompany.slice(0, index), ...this.state.leaseCompany.slice(index + 1)],
      leaseNumber: [...this.state.leaseNumber.slice(0, index), ...this.state.leaseNumber.slice(index + 1)]
    })
  }

  handleAddLease(e) {
    e.preventDefault()

    this.setState({
      leaseCompany: [...this.state.leaseCompany, ''],
      leaseNumber: [...this.state.leaseNumber, '']
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

  handleChangeInTerm(e) {
    this.setState({
      term: this.state.term.slice(0, 5) + e.target.value
    })
  }

  handleSave(e) {
    e.preventDefault()
    if (this.state.customerCreate) {
      this.props.saveAppThunk(this.props.token, [this.state, {amount: checkFor$(this.state.amount)}], [this.state.customer, {id: 'new'}])
    } else {
      this.props.saveAppThunk(this.props.token, [this.state, {amount: checkFor$(this.state.amount)}], [this.state.customer])
    }

    // if (this.state.notifyRep) {
    //   console.log('notifying rep!')
    //   axios.post('/api/apps/email', {token: this.props.token, rep: this.state.rep, customer: this.state.customer})
    //   .then(res => {
    //     console.log('mail sent', res.data)
    //   })
    // }

    this.setState({
      notifyRep: false
    })

  }

  handleSubmit(e) {
    e.preventDefault()

    // verification
    // let required = ['name', 'street', 'city', 'state', 'zip', 'phone', 'email']
    if (!this.state.customer || !this.state.customer.name || !this.state.customer.street || !this.state.customer.city || !this.state.customer.state || !this.state.customer.zip || !this.state.customer.phone || !this.state.customer.email) {
      this.props.throwAlert('red', 'Please fill in all required fields')
    } else {

      if (this.state.customerCreate) {
        this.props.saveAppThunk(this.props.token, [this.state, {status: 'New', date: getDate(), amount: checkFor$(this.state.amount)}], [this.state.customer, {id: 'new'}])
      } else {
        this.props.saveAppThunk(this.props.token, [this.state, {status: 'New', date: getDate(), amount: checkFor$(this.state.amount)}], [this.state.customer])
      }

      this.props.history.push('/applications')
    }
  }

  handleCheckbox(e) {
    this.setState({notifyRep: !this.state.notifyRep})
  }

  // For Admin section
  handleNotify(e) {
    e.preventDefault()

    this.setState({mailDisabled: true})

    axios.post('/api/mail', {
      token: this.props.token,
      // to: this.state.rep.email,
      to: 'tatan42@gmail.com',
      cc: this.state.mailCC.split(', '),
      subject: this.state.mailSubject,
      text: this.state.mailBody
    })
    .then(res => {
      console.log('accepted:', res.data.accepted)
      console.log('rejected:', res.data.rejected)
      this.setState({mailDisabled: false})
      if (res.data.accepted) {
        this.props.throwAlert('green', 'Message sent')
        this.setState({mailSubject: '', mailBody: '', mailCC: ''})
      }
      else this.props.throwAlert('red', 'Message not sent')
      
    })
  }

  handleNote(e) {
    let actions = Array.from(this.state.actions)
    actions[Number(e.target.id)].show = (actions[Number(e.target.id)].show) ? false : true
    this.setState({
      actions
    })
  }

  handleChangeAction(e) {

  }

  handleDelete(e) {

  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.app && newProps.app.customer) ? false : true
    })
    this.setState(newProps.app)
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
  }


  render() {
    const formatTerm = term => {
      if (term) {
        if (term.slice(0, 5) === 'other') return 'Other'
        else if (term.slice(0, 5) === 'co-te') return 'Co-Term'
        else return term
      } else return term
    }
    return(
      <div>
        <EditApplication
          values={this.state}
          iAmAuthor={(this.props.user) ? this.props.user.email === this.state.rep.email : false}
          admin={(this.props.user) ? this.props.user.level === 'Admin' : false}
          customers={(this.props.customers) ? this.props.customers.map(customer => customer.name) : null}
          handleChange={this.handleChange}
          handleRemoveLease={this.handleRemoveLease}
          handleChangeInLease={this.handleChangeInLease}
          handleAddLease={this.handleAddLease}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={this.handleSave}
          handleSubmit={this.handleSubmit}
          handleChangeCustomer={this.handleChangeCustomer}
          handleCheckbox={this.handleCheckbox}
          handleChangeInTerm={this.handleChangeInTerm}
          formatTerm={formatTerm}
          handleNotify={this.handleNotify}
          handleNote={this.handleNote}
          handleChangeAction={this.handleChangeAction}
          handleDelete={this.handleDelete}
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

const mapDispatchToProps = {saveAppThunk, createApp, throwAlert}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)