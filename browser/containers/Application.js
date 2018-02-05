import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditApplication from '../components/EditApplication'

import {saveAppThunk, loadAppsThunk, deleteAppThunk, createApp} from '../store/app-reducer'
import {saveByoThunk} from '../store/buyout-reducer'
import {throwAlert} from '../store/alert-reducer'

import {getDate, checkFor$, reformatDate} from '../utility'

class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {
        customerCreate: (this.props.app && this.props.app.customer) ? false : true,
        needQuote: false,
        mailBody: '',
        mailSubject: '',
        mailCC: '',
        mailDisabled: false
      },
      this.props.app,
    )

    this.handleChange = this.handleChange.bind(this)

    this.handleNewLease = this.handleNewLease.bind(this)
    this.handleChangeInLease = this.handleChangeInLease.bind(this)
    this.handleRemoveLease = this.handleRemoveLease.bind(this)

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

      this.setState({
        needQuote: false
      })
    }

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
    if (this.state.id === 'new') {
      this.props.loadAppsThunk(this.props.token, () => {this.props.history.push('/applications')})
      this.props.throwAlert('green', 'Your application has been deleted')
    } else {
      this.props.deleteAppThunk(this.props.token, this.state.id, () => {this.props.history.push('/applications')})
    }
  }

  handleCheckbox(e) {
    this.setState({needQuote: !this.state.needQuote})
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

  handleActionDelete(e) {
  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props')
    this.setState({
      customerCreate: (newProps.app && newProps.app.customer) ? false : true
    })
    this.setState(newProps.app)
    this.setState({
      date: reformatDate(newProps.app.date),
      expiry: reformatDate(newProps.app.expiry)
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
          count={1} // for numbering leases
          handleChange={this.handleChange}
          handleNewLease={this.handleNewLease}
          handleChangeInLease={this.handleChangeInLease}
          handleRemoveLease={this.handleRemoveLease}
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

const mapDispatchToProps = {saveAppThunk, loadAppsThunk, deleteAppThunk, saveByoThunk, createApp, throwAlert}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer)