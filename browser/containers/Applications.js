import React from 'react'
import {connect} from 'react-redux'

import {focusApp, createApp, sortApps} from '../store/app-reducer'

import {getDate} from '../utility'

class ApplicationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
    this.handleNewApp = this.handleNewApp.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleResubmit = this.handleResubmit.bind(this)
  }

  handleClick(e) {
    this.props.focusApp(Number(e.target.id))
    this.props.history.push('/edit-application')
  }

  handleNewApp(e) {
    this.props.createApp({
      id: 'new',
      status: 'Draft',
      date: getDate(),
      rep: this.props.user
    })
    this.props.history.push('/edit-application')
  }

  handleSort(e) {
    this.props.sortApps(e.target.id.split('-'))
    this.setState({sortingBy: e.target.id})
  }

  handleResubmit(e) {
    let app = this.props.apps[e.target.id]
    this.props.createApp({
      id: 'new',
      status: 'Draft',
      date: getDate(),
      rep: this.props.user,
      type: app.type,
      erp: app.erp,
      amount: app.amount,
      term: app.term,
      advancedPayments: app.advancedPayments,
      endOfTerm: app.endOfTerm,
      comments: app.comments
    })
    this.props.history.push('/edit-application')
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    console.log(this.props.apps)
  }

  render() {
    return(
      <div>
        <h2>Current Applications</h2>
        <button onClick={this.handleNewApp}>Start New Application</button>
        <div className="col-sm-12">
          <table>
            <tbody>
              <tr key="head">
                <td id="date" onClick={this.handleSort}>Date Submitted</td>
                <td>Customer Name</td>
                <td>Address</td>
                <td>Amount</td>
                <td id="status" onClick={this.handleSort}>Status</td>
                <td id="expiry" onClick={this.handleSort}>Expires</td>
                <td id="rep-fullName" onClick={this.handleSort}>Rep Name</td>
              </tr>
              {this.props.apps.map((app, index) => {
                return (
                  <tr key={app.id}>
                    <td>{app.date}</td>
                    <td>{(app.customer) ? app.customer.name : ''}</td>
                    <td>{(app.customer) ? app.customer.street : ''}</td>
                    <td>{app.amount}</td>
                    <td>{app.status}</td>
                    <td>{app.expiry}</td>
                    <td>{(app.rep) ? app.rep.fullName : ''}</td>
                    <td id={index} onClick={this.handleClick}>
                      {(this.props.user.level === 'Admin' || app.status === 'Draft') ?
                        'Edit' : 'View'
                      }
                    </td>
                    {/* <td>
                      {(app.pdf) ?
                        <a href={app.pdf} download>PDF</a>
                        : ''
                      }
                    </td> */}

                    <td id={index} onClick={(app.status === "Expired") ?
                      this.handleResubmit : function(){}}>
                      {(app.status === "Expired") ?
                        'Resubmit' : ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    user: state.login.user,
    apps: state.app.apps
  }
}

const mapDispatchToProps = {focusApp, createApp, sortApps}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)