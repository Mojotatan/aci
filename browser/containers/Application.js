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
        adminMode: false,
        adminView: (this.props.user) ? this.props.user.level === 'Admin' : false,
        lightbox: false,
        expiryTemp: ''
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
    
    this.validateFields = this.validateFields.bind(this)
    this.generateErrors = this.generateErrors.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.handleCheckbox = this.handleCheckbox.bind(this)

    this.handleNotify = this.handleNotify.bind(this)
    
    this.handleNote = this.handleNote.bind(this)
    this.handleChangeAction = this.handleChangeAction.bind(this)
    this.handleActionDelete = this.handleActionDelete.bind(this)
    this.handleSaveAction = this.handleSaveAction.bind(this)
    this.handleSaveAndNotify = this.handleSaveAndNotify.bind(this)

    this.handleAdminMode = this.handleAdminMode.bind(this)

    this.toggleAdminView = this.toggleAdminView.bind(this)
    this.toggleLightbox = this.toggleLightbox.bind(this)

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

  validateFields() {
    let errors = {}
    if (this.state.customer && this.state.customer.zip) errors.zip = (this.state.customer.zip.search(/\d\d\d\d\d|\d\d\d\d\d-\d\d\d\d/) === -1) ? true : false
    if (this.state.customer && this.state.customer.phone) errors.phone = (this.state.customer.phone.search(/\d\d\d(-|\.)\d\d\d(-|\.)\d\d\d\d|\(\d\d\d\)\s\d\d\d(-|\.)\d\d\d\d|\d\d\d\d\d\d\d\d\d\d/) === -1) ? true : false
    if (this.state.customer && this.state.customer.email) errors.email = (this.state.customer.email.search(/\w+@\w+\.\w+/) === -1) ? true : false

    // if (this.state.adminMode === 'action' && this.action.status === 'Approved') errors.expiry = 
    return errors
  }

  generateErrors(errors) {
    let fields = Object.keys(errors).filter(n => errors[n])

    return (e) => {
      e.preventDefault()
      this.props.throwAlert('red', `Problem with the ${fields.join(', ')} field${(fields.length > 1) ? 's' : ''}`)
    }

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
    if (confirm('Are you sure you wish to delete this application?')) this.props.deleteAppThunk(this.props.token, this.state.id, () => {this.props.history.push('/applications')})
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

    let expiryDate

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
      
      return axios.post('/api/logs/new', {token: this.props.token, date: new Date(), activity: `<b>${this.props.user.fullName}<b> notified rep ${this.state.rep.fullName} that application ${this.state.action.appNumber} to ${this.state.action.leasingCompany} was ${this.state.action.status}`, action: this.state.action, app: this.state.id, expiry: this.state.expiryTemp})
    })
    .then(res => {
      return this.props.saveAppThunk(this.props.token, [this.state, {expiry: this.state.expiryTemp, amount: checkFor$(this.state.amount)}], [this.state.customer])
    })
    .then(res => {
      this.setState({adminMode: false, expiryTemp: ''})
    })
    .catch(err => console.error(err))
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
    .catch(err => {
      console.error(err)
      this.props.throwAlert('red', 'Something went wrong')
    })

  }

  handleSaveAndNotify(e) {
    e.preventDefault()
    axios.put('/api/actions/', {token: this.props.token, action: Object.assign({}, this.state.action, {sentToRep: getDate()})})
    .then(res => {
      let soonToBeSubject = ''
      let soonToBeBody = ''
      if (this.state.action.status === 'Approved') {
        soonToBeSubject = `Application Approved for ${this.state.action.legalName}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour application for ${this.state.customer.name} has been approved with ${this.state.action.leasingCompany} under application number ${this.state.action.appNumber} for $${this.state.amount}.\n\nThe legal name is ${this.state.action.legalName}.\n\nPlease be sure to use the correct legal name on all of your lease paperwork.\n\nThanks,\n${this.props.user.firstName}`
      } else if (this.state.action.status === 'Hold') {
        soonToBeSubject = `Application On Hold for ${this.state.action.legalName}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour application for ${this.state.customer.name} is on hold. We have tried all of our options and we will need the following items to proceed.\n\n    • 2 years of Audited Financials or\n    • 2 years of Tax Returns\n\nPlease send this information to team@myadmincentral.com. If you have any questions just let us know.\n\nThanks,\n${this.props.user.firstName}`
      } else if (this.state.action.status === 'Declined') {
        soonToBeSubject = `Application Declined for ${this.state.action.legalName}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour application for ${this.state.customer.name} has been declined by all lenders. We will need the following items in order to try again.\n\n    •Personal Guarantee Information\n        • Owner's full name\n        • Owner's Address\n        • Owner's Social Security #\n        • Owner's Birth Date\n\nPlease send this information to team@myadmincentral.com. If you have any questions just let us know.\n\nThanks,\n${this.props.user.firstName}`
      }
      this.setState({
        expiryTemp: res.data,
        adminMode: 'notify',
        mailSubject: soonToBeSubject,
        mailBody: soonToBeBody
      })
    })
    .catch(err => {
      console.error(err)
      this.props.throwAlert('red', 'Something went wrong')
    })
  }

  handleAdminMode(e) {
    // console.log('trigger', e.target.id)
    if (e.target.id === 'cancel-button' || e.target.id === 'cancel') {
      this.setState({adminMode: false})
    } else if (e.target.id === 'submit-button' || e.target.id === 'app-button'){
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
        action: Object.assign({}, this.state.actions[index], {index: index})
      })
    }
  }

  toggleAdminView(e) {
    this.setState({
      adminView: !this.state.adminView
    })
  }

  toggleLightbox(e) {
    this.setState({
      lightbox: !this.state.lightbox
    })
  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.app && newProps.app.customer) ? false : true
    })
    this.setState(newProps.app)
    let actions = Array.from(newProps.app.actions)
    actions.forEach(action => {
      action.date = reformatDate(action.date)
      action.expiry = reformatDate(action.expiry)
    })
    this.setState({
      date: reformatDate(newProps.app.date),
      expiry: reformatDate(newProps.app.expiry),
      amount: getPrettyNumber(newProps.app.amount),
      actions
    })
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else {
      // console.log('state', this.state)
      let actions = Array.from(this.state.actions)
      actions.forEach(action => {
        action.date = reformatDate(action.date)
        action.expiry = reformatDate(action.expiry)
      })
      this.setState({
        date: reformatDate(this.state.date),
        expiry: reformatDate(this.state.expiry),
        amount: getPrettyNumber(this.state.amount),
        actions
      })
    }
  }


  render() {
    const formatTerm = term => {
      if (term) {
        if (term.slice(0, 5) === 'other') return 'Other'
        else if (term.slice(0, 5) === 'co-te') return 'Co-Term'
        else return term
      } else return term
    }
    // console.log(this.state.adminMode)
    let errors = this.validateFields()
    let disabled = Object.keys(errors).some(n => errors[n])

    let actionDisabled = Object.keys(errors).expiry

    return(
      <div>
        <EditApplication
          values={this.state}
          errors={errors}
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
          handleSave={(disabled) ? this.generateErrors(errors) : this.handleSave}
          handleSubmit={(disabled) ? this.generateErrors(errors) : this.handleSubmit}
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
          handleSaveAndNotify={this.handleSaveAndNotify}
          handleAdminMode={this.handleAdminMode}
          toggleAdminView={this.toggleAdminView}
          toggleLightbox={this.toggleLightbox}
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