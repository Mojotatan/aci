import React from 'react'
import {connect} from 'react-redux'

import {focusApp, createApp} from '../store/app-reducer'

import axios from 'axios'

class ApplicationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
    this.handleNewApp = this.handleNewApp.bind(this)
  }

  handleClick(e) {
    this.props.focusApp(Number(e.target.id))
    this.props.history.push('/edit-application')
  }

  handleNewApp(e) {
    let now = new Date()
    this.props.createApp({
      id: 'new',
      status: 'draft',
      date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
      // amount: '',
      // expiry: '',
      // // advancedPayments: '',
      // // endOfTerm: '',
      // type: '',
      // // currentLeaseCompany: '',
      // erp: '',
      // bank: '',
      // comments: '',
    })
    this.props.history.push('/edit-application')
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>Applications</h2>
        <button onClick={this.handleNewApp}>Create new application</button>
        <table>
          <tbody>
            <tr key="head">
              <td>date</td>
              <td>customer name</td>
              <td>customer address</td>
              <td>amount</td>
              <td>status</td>
              <td>expiry</td>
              <td>rep</td>
              <td>options</td>
            </tr>
            {this.props.apps.map((app, index) => {
              return (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{(app.customer) ? app.customer.name : ''}</td>
                  <td>{(app.customer) ? app.customer.address : ''}</td>
                  <td>{app.amount}</td>
                  <td>{app.status}</td>
                  <td>{app.expiry}</td>
                  <td>{app.rep.fullName}</td>
                  <td id={index} onClick={this.handleClick}>Edit</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    apps: state.app.apps
  }
}

const mapDispatchToProps = {focusApp, createApp}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)