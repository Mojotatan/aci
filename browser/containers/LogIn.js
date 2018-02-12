import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {logInToken, flushToken} from '../store/login-reducer'
import {loadAppsThunk, flushApps} from '../store/app-reducer'
import {loadByosThunk, flushByos} from '../store/buyout-reducer'
import {loadDealersThunk, flushDealers} from '../store/dealer-reducer'
import {loadBranchesThunk, flushBranches} from '../store/branch-reducer'
import {loadRegionsThunk, flushRegions} from '../store/region-reducer'
import {loadCustomersThunk, flushCustomers} from '../store/customer-reducer'
import {loadUsersThunk, flushUsers} from '../store/users-reducer'
import {loadLeasesThunk, flushLeases} from '../store/lease-reducer'
import {throwAlert} from '../store/alert-reducer'

import Header from '../components/Header'
import LogInForm from '../components/LogInForm'
import ResetForm from '../components/ResetForm'

import axios from 'axios'

class LogInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      reset: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleControl = this.handleControl.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log('u: ' + this.state.username, 'p: ' + this.state.password)
    this.setState({password: ''})
    axios.post('/api/login', {u: this.state.username.toLowerCase(), pw: this.state.password})
    .then((res) => {
      // console.log('promise achieved', res.data)
      if (typeof res.data !== 'string') {
        this.props.logInToken(res.data.token, res.data.user)
        // Technically only loadCustomersThunk *needs* to be called here
        // But it makes for a slightly better loading experience
        // If initial loading times become unbearable this can be changed

        this.props.loadAppsThunk(res.data.token)
        this.props.loadByosThunk(res.data.token)
        this.props.loadCustomersThunk(res.data.token)
        this.props.loadLeasesThunk(res.data.token)
        if (res.data.user.level === 'Admin') { // not needed for non admins
          this.props.loadDealersThunk(res.data.token)
          this.props.loadBranchesThunk(res.data.token)
          this.props.loadRegionsThunk(res.data.token)
          this.props.loadUsersThunk(res.data.token)
        }
        this.props.history.push('/applications')
      }
      else {
        this.props.throwAlert('red', res.data)
      }
    })
    .catch(err => console.error(err))
  }

  handleControl(e) {
    e.preventDefault()
    this.setState({reset: !this.state.reset})
  }

  handleReset(e) {
    e.preventDefault()

    axios.post('/api/login/forgot', {email: this.state.username})
    .then(res => {
      this.props.throwAlert(...res.data.message)
    })
    .catch(err => console.error(err))

  }

  logOut(e) {
    // empty redux store
    this.props.flushToken()
    this.props.flushApps()
    this.props.flushByos()
    this.props.flushDealers()
    this.props.flushBranches()
    this.props.flushRegions()
    this.props.flushCustomers()
    this.props.flushUsers()
    this.props.flushLeases()
    this.setState({
      username: "",
      password: ""
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} logOut={this.logOut} />
        {(!this.props.token) ?
          (this.state.reset) ?
            <ResetForm
              handleChange={this.handleChange}
              handleSubmit={this.handleReset}
              handleControl={this.handleControl}
            />
            :
            <LogInForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleControl={this.handleControl}
            />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    user: state.login.user,
  }
}

const mapDispatchToProps = {
  logInToken, flushToken,
  loadAppsThunk, flushApps,
  loadByosThunk, flushByos,
  loadDealersThunk, flushDealers,
  loadBranchesThunk, flushBranches,
  loadRegionsThunk, flushRegions,
  loadCustomersThunk, flushCustomers,
  loadUsersThunk, flushUsers,
  loadLeasesThunk, flushLeases,
  throwAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogInContainer))