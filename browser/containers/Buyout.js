import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditBuyout from '../components/EditBuyout'

import {saveByoThunk, loadByosThunk, deleteByoThunk} from '../store/buyout-reducer'
import {focusApp} from '../store/app-reducer'
import {throwAlert} from '../store/alert-reducer'

import {getDate, reformatDate} from '../utility'

class BuyoutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.byo && this.props.byo.customer) ? false : true,
        mailBody: '',
        mailSubject: '',
        mailCC: '',
        mailDisabled: false,
        adminMode: false,
        adminView: (this.props.user) ? this.props.user.level === 'Admin' : false,
        calcView: false,
        lightbox: false,
        expiryTemp: '',
        upload: null,
        note: ''
      },
      this.props.byo,
    )

    this.handleAppLink = this.handleAppLink.bind(this)

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
    
    this.validateFields = this.validateFields.bind(this)
    this.generateErrors = this.generateErrors.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.handleNotify = this.handleNotify.bind(this)
    
    this.handleNote = this.handleNote.bind(this)
    this.handleChangeAction = this.handleChangeAction.bind(this)
    this.handleActionDelete = this.handleActionDelete.bind(this)
    this.handleSaveAction = this.handleSaveAction.bind(this)
    this.handleSaveAndNotify = this.handleSaveAndNotify.bind(this)

    this.handleAdminMode = this.handleAdminMode.bind(this)

    this.toggleAdminView = this.toggleAdminView.bind(this)
    this.toggleLightbox = this.toggleLightbox.bind(this)

    this.toggleCalcView = this.toggleCalcView.bind(this)

    this.handleChangeInPDFNote = this.handleChangeInPDFNote.bind(this)
    this.handleDeletePDF = this.handleDeletePDF.bind(this)
    this.handleChoosePDF = this.handleChoosePDF.bind(this)
    this.handleUploadPDF = this.handleUploadPDF.bind(this)
  }

  handleAppLink(e) {
    this.props.focusApp(Number(e.target.id))
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

  validateFields() {
    let errors = {}
    if (this.state.customer && this.state.customer.zip) errors.zip = (this.state.customer.zip.search(/\d\d\d\d\d|\d\d\d\d\d-\d\d\d\d/) === -1) ? true : false
    if (this.state.customer && this.state.customer.phone) errors.phone = (this.state.customer.phone.search(/\d\d\d(-|\.)\d\d\d(-|\.)\d\d\d\d|\(\d\d\d\)\s\d\d\d(-|\.)\d\d\d\d|\d\d\d\d\d\d\d\d\d\d/) === -1) ? true : false
    if (this.state.customer && this.state.customer.email) errors.email = (this.state.customer.email.search(/\w+@\w+\.\w+/) === -1) ? true : false
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
        this.props.saveByoThunk(this.props.token, [this.state, {status: 'New', date: getDate()}], [this.state.customer, {id: 'new'}])
      } else {
        this.props.saveByoThunk(this.props.token, [this.state, {status: 'New', date: getDate()}], [this.state.customer])
      }

      this.props.history.push('/buyouts')
    }
  }

  handleDelete(e) {
    e.preventDefault()
    if (confirm('Are you sure you wish to delete this buyout?')) this.props.deleteByoThunk(this.props.token, this.state.id, () => {this.props.history.push('/buyouts')})
  }

  handleChangeInLease(e) {
    let name = e.target.id.split('-')
    let leases = Array.from(this.state.leases)
    leases[name[0]][name[1]] = e.target.value
    if (e.target.value === 'Partial') leases[name[0]].displayMachines = true
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

  // For Admin section
  handleNotify(e) {
    e.preventDefault()

    this.setState({mailDisabled: true})

    let expiryDate

    axios.post('/api/mail', {
      token: this.props.token,
      to: this.state.rep.email,
      // to: 'tatan42@gmail.com',
      cc: this.state.mailCC.split(', '),
      subject: this.state.mailSubject,
      html: this.state.mailBody
    })
    .then(res => {
      // console.log('accepted:', res.data.accepted)
      // console.log('rejected:', res.data.rejected)
      this.setState({mailDisabled: false})
      if (res.data.accepted) {
        this.props.throwAlert('green', 'Message sent')
        this.setState({mailSubject: '', mailBody: '', mailCC: ''})
      }
      else this.props.throwAlert('red', 'Message not sent')
      
      return axios.post('/api/logs/new', {token: this.props.token, date: getDate(), activity: `<b>${this.props.user.fullName}<b> notified rep ${this.state.rep.fullName} that application ${this.state.action.appNumber} to ${this.state.action.leasingCompany} was ${this.state.action.status}`, action: this.state.action, byo: this.state.id, expiry: this.state.expiryTemp})
    })
    .then(res => {
      let overallStatus
      if (this.state.action.status === 'Working') overallStatus = 'Working'
      else if (this.state.action.status === 'Approved') overallStatus = 'Approved'
      else if (this.state.action.status === 'Declined') overallStatus = 'Declined'

      if (overallStatus) return this.props.saveByoThunk(this.props.token, [this.state, {status: overallStatus, expiry: this.state.expiryTemp}], [this.state.customer])
      else return this.props.saveByoThunk(this.props.token, [this.state, {expiry: this.state.expiryTemp}], [this.state.customer])
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
    if (confirm('Are you sure you wish to delete this application?')) {
      axios.put('/api/actions/delete', {token: this.props.token, action: this.state.actions[e.target.id]})
      .then(res => {
        this.props.loadAppsThunk(this.props.token)
      })
      .catch(err => console.error(err))
    }
  }

  handleSaveAction(e) {
    e.preventDefault()
    axios.put('/api/actions/', {token: this.props.token, action: this.state.action})
    .then(res => {
      this.props.loadByosThunk(this.props.token)
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
        soonToBeSubject = `Buyout Approved for ${this.state.action.legalName}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour buyout for ${this.state.customer.name} has been approved with ${this.state.action.leasingCompany} under application number ${this.state.action.appNumber}.\n\nThe legal name is ${this.state.action.legalName}.\n\nPlease be sure to use the correct legal name on all of your lease paperwork.\n\nThanks,\n${this.props.user.firstName}`
      } else if (this.state.action.status === 'Hold') {
        soonToBeSubject = `Buyout On Hold for ${this.state.customer.name}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour buyout for ${this.state.customer.name} is on hold. We have tried all of our options and we will need the following items to proceed.\n\n    • 2 years of Audited Financials or\n    • 2 years of Tax Returns\n\nPlease send this information to team@myadmincentral.com. If you have any questions just let us know.\n\nThanks,\n${this.props.user.firstName}`
      } else if (this.state.action.status === 'Declined') {
        soonToBeSubject = `Buyout Declined for ${this.state.customer.name}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour buyout for ${this.state.customer.name} has been declined by all lenders. We will need the following items in order to try again.\n\n    •Personal Guarantee Information\n        • Owner's full name\n        • Owner's Address\n        • Owner's Social Security #\n        • Owner's Birth Date\n\nPlease send this information to team@myadmincentral.com. If you have any questions just let us know.\n\nThanks,\n${this.props.user.firstName}`
      } else {
        soonToBeSubject = `Update for Buyout for ${this.state.customer.name}`
        soonToBeBody = `Dear ${this.state.rep.fullName},\n\nYour buyout's status has been set to ${this.state.action.status}.\n\nThanks,\n${this.props.user.firstName}`
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
          buyoutId: this.state.id
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

  toggleCalcView(e) {
    this.setState({
      calcView: !this.state.calcView
    })
  }


  handleDeletePDF(e) {
    // let pdfs = Array.from(this.state.pdfs)
        
    // this.props.saveByoThunk(this.props.token, [this.state, {pdfNotes, pdfs}], [this.state.customer])
    axios.delete(`/api/uploads/${e.target.id}?access_token=${this.props.token}`)
    .then(res => {
      console.log(res.data)
      this.props.loadByosThunk(this.props.token)
    })
  }

  handleChangeInPDFNote(e) {
    this.setState({note: e.target.value})
  }
  
  handleChoosePDF(e) {
    this.setState({upload: e.target.files[0]})
  }

  handleUploadPDF(e) {
    e.preventDefault()
    if (this.state.upload) {
      let formData = new FormData()
      formData.append('file', this.state.upload)
      formData.append('note', this.state.note)
      axios.post(`/api/uploads/buyout/${this.state.id}?access_token=${this.props.token}`, formData, {'content-type': 'multipart/form-data'})
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
    let actions = Array.from(newProps.byo.actions)
    actions.forEach(action => {
      action.date = reformatDate(action.date)
      action.expiry = reformatDate(action.expiry)
    })
    this.setState({
      date: reformatDate(newProps.byo.date),
      expiry: reformatDate(newProps.byo.expiry),
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
        actions
      })
    }
  }


  render() {
    // console.log('state', this.state.pdfs)
    let errors = this.validateFields()
    let disabled = Object.keys(errors).some(n => errors[n])

    let actionDisabled = Object.keys(errors).expiry

    return(
      <div>
        <EditBuyout
          values={this.state}
          errors={errors}
          token={this.props.token} // token needed to make request for pdf -- not preferable
          iAmAuthor={(this.props.user) ? this.props.user.email === this.state.rep.email : false}
          admin={(this.props.user) ? this.props.user.level === 'Admin' : false}
          customers={(this.props.customers) ? this.props.customers.map(customer => customer.name) : null}
          leases={this.props.leases}
          count={1} // for numbering leases
          handleAppLink={this.handleAppLink}
          handleChange={this.handleChange}
          handleChangeInCustomer={this.handleChangeInCustomer}
          handleSave={(disabled) ? this.generateErrors(errors) : this.handleSave}
          handleSubmit={(disabled) ? this.generateErrors(errors) : this.handleSubmit}
          handleDelete={this.handleDelete}
          handleChangeCustomer={this.handleChangeCustomer}
          handleNewLease={this.handleNewLease}
          handleChangeInLease={this.handleChangeInLease}
          handleRemoveLease={this.handleRemoveLease}
          toggleMachines={this.toggleMachines}
          handleNewMachine={this.handleNewMachine}
          handleChangeInMachine={this.handleChangeInMachine}
          handleRemoveMachine={this.handleRemoveMachine}
          handleNotify={this.handleNotify}
          handleNote={this.handleNote}
          handleChangeAction={this.handleChangeAction}
          handleActionDelete={this.handleActionDelete}
          handleSaveAction={this.handleSaveAction}
          handleSaveAndNotify={this.handleSaveAndNotify}
          handleAdminMode={this.handleAdminMode}
          toggleAdminView={this.toggleAdminView}
          toggleLightbox={this.toggleLightbox}
          toggleCalcView={this.toggleCalcView}
          handleChangeInPDFNote={this.handleChangeInPDFNote}
          handleDeletePDF={this.handleDeletePDF}
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
    byo: state.byo.byos.filter(byo => (byo.id === state.byo.focus))[0],
    customers: state.customer.customers,
    leases: state.lease.leases
  }
}

const mapDispatchToProps = {saveByoThunk, loadByosThunk, deleteByoThunk, focusApp, throwAlert}

export default connect(mapStateToProps, mapDispatchToProps)(BuyoutContainer)