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

import Header from '../components/Header'
import LogInForm from '../components/LogInForm'

import axios from 'axios'

class LogInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    axios.post('/api/login', {u: this.state.username, pw: this.state.password})
    .then((res) => {
      // console.log('promise achieved', res.data)
      if (typeof res.data !== 'string') {
        this.props.logInToken(res.data.token, res.data.user)
        this.props.loadAppsThunk(res.data.token)
        this.props.loadByosThunk(res.data.token)
        this.props.loadDealersThunk(res.data.token)
        this.props.loadBranchesThunk(res.data.token)
        this.props.loadRegionsThunk(res.data.token)
        this.props.loadCustomersThunk(res.data.token)
        // document.cookie = res.data.token
        this.props.history.push('/applications')
      }
    })
    .catch(err => console.error(err))
  }

  logOut(e) {
    this.props.flushToken()
    this.props.flushApps()
    this.props.flushByos()
    this.props.flushDealers()
    this.props.flushBranches()
    this.props.flushRegions()
    this.props.flushCustomers()
    this.props.history.push('/')
  }

  render() {
    if (this.props.token) {
      return (
        <Header user={this.props.user} logOut={this.logOut} />
      )
    }
    else {
      return (
        <LogInForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      )
    }
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
  loadCustomersThunk, flushCustomers
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogInContainer))