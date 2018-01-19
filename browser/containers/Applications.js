import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusApp, createApp, sortApps} from '../store/app-reducer'

import {getDate, reformatDate} from '../utility'

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
      rep: this.props.user,
      advancedPayments: '2',
      endOfTerm: 'FMV'

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
  }

  render() {
    return(
      <div>
        <Menu />
        <div className="col-sm-12 no-gutters app-header-top">
          <div><h2 className="app-title">Current Applications</h2></div>
          <div className="newapp"><button className="app-button" onClick={this.handleNewApp}>Start New Application</button></div>
        </div>
        <div className="col-sm-12 no-gutters">
          <table className="app-table">
            <tbody>
              <tr className="app-header-bottom" key="head">
                <td id="date" className={(this.props.sort.join('-') === "date") ? 'sorting' : ''} onClick={this.handleSort}>Date Submitted</td>
                <td>Customer Name</td>
                <td>Address</td>
                <td>Amount</td>
                <td id="status" className={(this.props.sort.join('-') === "status") ? 'sorting' : ''} onClick={this.handleSort}>Status</td>
                <td id="expiry" className={(this.props.sort.join('-') === "expiry") ? 'sorting' : ''} onClick={this.handleSort}>Expires</td>
                <td id="rep-fullName" className={(this.props.sort.join('-') === "rep-fullName") ? 'sorting' : ''} onClick={this.handleSort}>Rep Name</td>
                <td></td>
                <td></td>
              </tr>
              {this.props.apps.map((app, index) => {

                return (
                  <tr key={app.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                    <td>{reformatDate(app.date)}</td>
                    <td>{(app.customer) ? app.customer.name : ''}</td>
                    <td>{(app.customer) ? app.customer.street : ''}</td>
                    <td>{(app.amount) ? `$${app.amount}` : ''}</td>
                    <td>{app.status}</td>
                    <td>{reformatDate(app.expiry)}</td>
                    <td>{(app.rep) ? app.rep.fullName : ''}</td>
                    <td id={index} onClick={this.handleClick} className="edit">
                      {(this.props.user.level === 'Admin' || app.status === 'Draft') ?
                        'Edit' : 'View'
                      }
                    </td>

                    <td id={index} className="edit" onClick={(app.status === "Expired") ?
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
    apps: state.app.apps,
    sort: state.app.sort
  }
}

const mapDispatchToProps = {focusApp, createApp, sortApps}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)