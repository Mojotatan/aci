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
        upload: null,
        note: ''
      },
      this.props.byo,
    )

    this.handleAppLink = this.handleAppLink.bind(this)

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
    this.props.deleteByoThunk(this.props.token, this.state.id, () => {this.props.history.push('/buyouts')})
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
  
  handleDeletePDF(e) {
    let index = e.target.id.split('-')[0]
    let name = e.target.id.split('-')[1]
    let pdfs = Array.from(this.state.pdfs)
    let pdfNotes = Array.from(this.state.pdfNotes)
    
    pdfs = [...pdfs.slice(0, index), ...pdfs.slice(index + 1)]
    pdfNotes = [...pdfNotes.slice(0, index), ...pdfNotes.slice(index + 1)]
    
    // this.setState({'pdfNotes': pdfNotes, 'pdfs': pdfs})
    
    this.props.saveByoThunk(this.props.token, [this.state, {pdfNotes, pdfs}], [this.state.customer])
    axios.delete(`/api/uploads/pdf/${this.state.id}/${name}?access_token=${this.props.token}`)
    .then(res => {
      console.log(res.data)
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
    else {
      // console.log('state', this.state)
      this.setState({
        date: reformatDate(this.state.date),
        expiry: reformatDate(this.state.expiry)
      })
    }
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
          leases={this.props.leases}
          count={1} // for numbering leases
          handleAppLink={this.handleAppLink}
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