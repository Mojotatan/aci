import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditApplication from '../components/EditApplication'

import {saveAppThunk, loadAppsThunk, deleteAppThunk} from '../store/app-reducer'
import {focusByo, saveByoThunk} from '../store/buyout-reducer'
import {throwAlert} from '../store/alert-reducer'

import {getDate, checkFor$, reformatDate, getPrettyNumber} from '../utility'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.app && this.props.app.customer) ? false : true,
        mailBody: '',
        mailSubject: '',
        mailCC: '',
        mailDisabled: false,
        adminMode: false
      },
      this.props.app,
    )

    this.handleByoLink = this.handleByoLink.bind(this)

    this.handleChange = this.handleChange.bind(this)

    this.handleNewLease = this.handleNewLease.bind(this)
    this.handleChangeInLease = this.handleChangeInLease.bind(this)
    this.handleRemoveLease = this.handleRemoveLease.bind(this)

    this.toggleMachines = this.toggleMachines.bind(this)
    this.handleNewMachine = this.handleNewMachine.bind(this)
    this.handleChangeInMachine = this.handleChangeInMachine.bind(this)
    this.handleRemoveMachine = this.handleRemoveMachine.bind(this)

    this.handleChangeInCustomer = this.handleChangeInCustomer.bind(this)
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)

    this.handleChangeInTerm = this.handleChangeInTerm.bind(this)
    
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.handleCheckbox = this.handleCheckbox.bind(this)

    this.handleNotify = this.handleNotify.bind(this)
    
    this.handleNote = this.handleNote.bind(this)
    this.handleChangeAction = this.handleChangeAction.bind(this)
    this.handleActionDelete = this.handleActionDelete.bind(this)
    this.handleSaveAction = this.handleSaveAction.bind(this)

    this.handleAdminMode = this.handleAdminMode.bind(this)

  }

  handleByoLink(e) {
    this.props.focusByo(Number(e.target.id))
  }

  handleChange(e) {
    // console.log('state', this.state)
    // console.log('props', this.props)
    this.setState({
      [e.target.name]: e.target.value
    })
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
      appId: this.state.id
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

    let custArr = (this.state.customerCreate) ? [this.state.customer, {id: 'new'}] : [this.state.customer]
    this.props.saveAppThunk(this.props.token, [this.state, {amount: checkFor$(this.state.amount)}], custArr)

    let needQuotes = this.state.leases.filter(lse => (lse.needQuote))
    needQuotes.forEach(quote => {
      this.props.saveByoThunk(this.props.token, [
          this.state,
          {
            id: 'new',
            status: 'New',
            date: getDate(),
            expiry: null,
            appId: this.state.id,
            leases: [quote]
          }
        ],
        custArr
      )
    })

  }

  handleSubmit(e) {
    e.preventDefault()

    // verification
    // let required = ['name', 'street', 'city', 'state', 'zip', 'phone', 'email']
    if (!this.state.amount || !this.state.customer || !this.state.customer.name || !this.state.customer.street || !this.state.customer.city || !this.state.customer.state || !this.state.customer.zip || !this.state.customer.phone) {
      this.props.throwAlert('red', 'Please fill in all required fields')
    } else {

      let custArr = (this.state.customerCreate) ? [this.state.customer, {id: 'new'}] : [this.state.customer]

      this.props.saveAppThunk(this.props.token, [this.state, {status: 'New', date: getDate(), amount: checkFor$(this.state.amount)}], custArr)
      
      if (this.state.needQuote) {
        this.props.saveByoThunk(this.props.token, [
            this.state,
            {
              id: 'new',
              status: 'New',
              date: getDate(),
              expiry: null
            }
          ],
          custArr
        )
      }

      this.props.history.push('/applications')
    }
  }

  handleDelete(e) {
    e.preventDefault()
    this.props.deleteAppThunk(this.props.token, this.state.id, () => {this.props.history.push('/applications')})
  }

  handleCheckbox(e) {
    let name = e.target.id.split('-')
    let leases = Array.from(this.state.leases)
    leases[name[0]].needQuote = !this.state.leases[name[0]].needQuote
    this.setState({'leases': leases})
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
    this.setState({actions})
  }

  handleChangeAction(e) {
    let action = Object.assign({}, this.state.action)
    action[e.target.name] = e.target.value
    this.setState({action})
  }

  handleActionDelete(e) {
    axios.put('/api/actions/delete', {token: this.props.token, action: this.state.actions[e.target.id]})
    .then(res => {
      this.props.loadAppsThunk(this.props.token)
    })
    .catch(err => console.error(err))
  }

  handleSaveAction(e) {
    e.preventDefault()
    axios.put('/api/actions/', {token: this.props.token, action: this.state.action})
    .then(res => {
      this.props.loadAppsThunk(this.props.token)
      // this.props.throwAlert('green', 'Success')
      this.setState({adminMode: false})
    })
    .catch(err => console.error(err))

  }

  handleAdminMode(e) {
    if (e.target.id === 'cancel-button') {
      this.setState({adminMode: false})
    } else if (e.target.id === 'submit-button'){
      this.setState({
        adminMode: 'action',
        action: {
          id: 'new',
          date: getDate(),
          appId: this.state.id
        }
      })
    } else {
      let index = e.target.id.split('-')[1]
      this.setState({
        adminMode: 'action',
        action: this.state.actions[index]
      })
    }
  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.app && newProps.app.customer) ? false : true
    })
    this.setState(newProps.app)
    this.setState({
      date: reformatDate(newProps.app.date),
      expiry: reformatDate(newProps.app.expiry),
      amount: getPrettyNumber(newProps.app.amount)
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
    this.setState({
      date: reformatDate(this.state.date),
      expiry: reformatDate(this.state.expiry),
      amount: getPrettyNumber(this.state.amount)
    })
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
          leases={this.props.leases}
          count={1} // for numbering leases
          handleByoLink={this.handleByoLink}
          handleChange={this.handleChange}
          handleNewLease={this.handleNewLease}
          handleChangeInLease={this.handleChangeInLease}
          handleRemoveLease={this.handleRemoveLease}
          toggleMachines={this.toggleMachines}
          handleNewMachine={this.handleNewMachine}
          handleChangeInMachine={this.handleChangeInMachine}
          handleRemoveMachine={this.handleRemoveMachine}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={this.handleSave}
          handleSubmit={this.handleSubmit}
          handleDelete={this.handleDelete}
          handleChangeCustomer={this.handleChangeCustomer}
          handleCheckbox={this.handleCheckbox}
          handleChangeInTerm={this.handleChangeInTerm}
          formatTerm={formatTerm}
          handleNotify={this.handleNotify}
          handleNote={this.handleNote}
          handleChangeAction={this.handleChangeAction}
          handleActionDelete={this.handleActionDelete}
          handleSaveAction={this.handleSaveAction}
          handleAdminMode={this.handleAdminMode}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    user: state.login.user,
    app: state.app.apps.filter(app => (app.id === state.app.focus))[0],
    customers: state.customer.customers,
    leases: state.lease.leases
  }
}

const mapDispatchToProps = {saveAppThunk, loadAppsThunk, deleteAppThunk, focusByo, saveByoThunk, throwAlert}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)