import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusApp, createApp, sortApps, loadAppsThunk} from '../store/app-reducer'

import {getDate, reformatDate, getPrettyNumber} from '../utility'

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
      // date: getDate(),
      rep: this.props.user,
      advancedPayments: '2',
      endOfTerm: 'FMV',
      term: '60',
      leases: []
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
      leaseCompany: app.leaseCompany,
      leaseNumber: app.leaseNumber,
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
    else this.props.loadAppsThunk(this.props.token)
  }

  render() {
    return(
      <div className="ex-table">
        <Menu />
        <div className="col-sm-12 no-gutters app-header-top">
          <div><h2 className="app-title">Current Applications</h2></div>
          <div className="newapp"><button className="app-button" onClick={this.handleNewApp}>Start New Application</button></div>
        </div>
        <div className="col-sm-12 no-gutters margin-drop">
          <div className="app-table">
            <div className="app-header-bottom" key="head">
              <span id="date" className={(this.props.sort.join('-') === "date") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Date Submitted</span>
              <span id="customer-name" className={(this.props.sort.join('-') === "customer-name") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Customer Name</span>
              <span id="customer-street" className={(this.props.sort.join('-') === "customer-street") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Address</span>
              <span id="amount" className={(this.props.sort.join('-') === "amount") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Deal Size</span>
              <span id="status" className={(this.props.sort.join('-') === "status") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Status</span>
              <span>Leasing Company</span>
              <span>Approval Number</span>
              <span id="expiry" className={(this.props.sort.join('-') === "expiry") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Expires</span>
              <span id="rep-fullName" className={(this.props.sort.join('-') === "rep-fullName") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Rep Name</span>
              <span className=""></span>
            </div>
            {this.props.apps.map((app, index) => {

              return (
                <div key={app.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                  <span>{reformatDate(app.date)}</span>
                  <span>{(app.customer) ? app.customer.name : ''}</span>
                  <span>{(app.customer) ? app.customer.street : ''}</span>
                  <span className="right-justify">{(app.amount) ? getPrettyNumber(app.amount) : ''}</span>
                  <span>{app.status}</span>
                  <span>{''}</span>
                  <span>{''}</span>
                  <span>{reformatDate(app.expiry)}</span>
                  <span>{(app.rep) ? app.rep.fullName : ''}</span>
                  {(this.props.user.level === 'Admin' || app.status !== 'Expired') ?
                    <span id={index} onClick={this.handleClick} className="edit table-right">
                      {(this.props.user.level === 'Admin' || app.status !== 'Working') ?
                        'Edit' : 'View'
                      }
                    </span>
                    :
                    <span id={index} className="edit" onClick={this.handleResubmit}>
                      Resubmit
                    </span>
                  }
                </div>
              )
            })}
          </div>
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

const mapDispatchToProps = {focusApp, createApp, sortApps, loadAppsThunk}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)