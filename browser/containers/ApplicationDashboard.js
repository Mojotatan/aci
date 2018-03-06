import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusApp, sortApps, loadAppsThunk, createAppThunk, saveAppThunk} from '../store/app-reducer'

import {getDate, reformatDate, getPrettyNumber} from '../utility'

class ApplicationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
    this.handleNewApp = this.handleNewApp.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleResubmit = this.handleResubmit.bind(this)

    this.refresh = this.refresh.bind(this)
  }

  handleClick(e) {
    this.props.focusApp(Number(e.target.id))
    this.props.history.push('/edit-application')
  }

  handleNewApp(e) {
    this.props.createAppThunk(this.props.token, () => {this.props.history.push('/edit-application')})
  }

  handleSort(e) {
    this.props.sortApps(e.target.id.split('-'))
    this.setState({sortingBy: e.target.id})
  }

  handleResubmit(e) {
    let reApp = this.props.apps.filter(app => (app.id == e.target.id))[0]
    // this.props.saveAppThunk(
    //   this.props.token,
    //   [reApp, {
    //     id: 'new',
    //     status: 'Draft',
    //     date: getDate(),
    //     expiry: null
    //   }],
    //   [reApp.customer],
    //   data => {
    //     this.props.focusApp(data.appId)
    //     this.props.history.push('/edit-application')
    //   }
    // )
    this.props.saveAppThunk(
      this.props.token,
      [reApp, {
        status: 'Draft',
        date: null,
        expiry: null
      }],
      [reApp.customer],
      data => {
        this.props.focusApp(data.appId)
        this.props.history.push('/edit-application')
      }
    )
  }

  refresh(e) {
    this.props.loadAppsThunk(this.props.token)
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
          <div onClick={this.refresh}>
            <span className="refresh">Refresh</span>
            <img className="refresh-btn" src="/assets/img/reload.svg" />
          </div>
          <div className="newapp"><button className="app-button" onClick={this.handleNewApp}>Start New Application</button></div>
        </div>
        <div className="col-sm-12 no-gutters margin-drop">
          <div className="app-table">
            <div className="app-header-bottom" key="head">
              <span id="date" className={(this.props.sort.join('-') === "date") ? 'date sorting' : 'date sortable'} onClick={this.handleSort}>Date Submitted</span>
              <span id="customer-name" className={(this.props.sort.join('-') === "customer-name") ? 'customer sorting' : 'customer sortable'} onClick={this.handleSort}>Customer Name</span>
              <span id="customer-street" className={(this.props.sort.join('-') === "customer-street") ? 'address sorting' : 'address sortable'} onClick={this.handleSort}>Address</span>
              <span id="amount" className={(this.props.sort.join('-') === "amount") ? 'amount sorting' : 'amount sortable'} onClick={this.handleSort}>Deal Size</span>
              <span id="status" className={(this.props.sort.join('-') === "status") ? 'status sorting' : 'status sortable'} onClick={this.handleSort}>Status</span>
              <span id="actions-0-leasingCompany" className={(this.props.sort.join('-') === "actions-0-leasingCompany") ? 'company sorting' : 'company sortable'} onClick={this.handleSort}>Leasing Company</span>
              <span id="actions-0-appNumber" className={(this.props.sort.join('-') === "actions-0-appNumber") ? 'approval sorting' : 'approval sortable'} onClick={this.handleSort}>Approval Number</span>
              <span id="expiry" className={(this.props.sort.join('-') === "expiry") ? 'expiry sorting' : 'expiry sortable'} onClick={this.handleSort}>Expiration Date</span>
              <span id="rep-fullName" className={(this.props.sort.join('-') === "rep-fullName") ? 'rep sorting' : 'rep sortable'} onClick={this.handleSort}>Rep Name</span>
              <span className="options"></span>
            </div>
            {this.props.apps.map((app, index) => {

              return (
                <div key={app.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                  <span className="date">{reformatDate(app.date)}</span>
                  <span className="customer">{(app.customer) ? app.customer.name : ''}</span>
                  <span className="address">{(app.customer) ? app.customer.street : ''}</span>
                  <span className="amount right-justify">{(app.amount) ? getPrettyNumber(app.amount, '$') : ''}</span>
                  <span className={`status ${app.status}`}>{app.status}</span>
                  <span className="company">{(app.actions && app.actions[0] && app.actions[0].sentToRep) ? app.actions[0].leasingCompany : ''}</span>
                  <span className="approval">{(app.actions && app.actions[0] && app.actions[0].sentToRep) ? app.actions[0].appNumber : ''}</span>
                  <span className="expiry">{reformatDate(app.expiry)}</span>
                  {/* <span className="expiry">{(app.actions && app.actions[0] && app.actions[0].sentToRep) ? reformatDate(app.actions[0].expiry) : ''}</span> */}
                  <span className="rep">{(app.rep) ? app.rep.fullName : ''}</span>
                  {(this.props.user.level === 'Admin' || app.status !== 'Expired') ?
                    <span id={app.id} onClick={this.handleClick} className="options edit table-right">
                      {(this.props.user.level === 'Admin' || app.status !== 'Working') ?
                        'Edit' : 'View'
                      }
                    </span>
                    :
                    <span id={app.id} className="options edit" onClick={this.handleResubmit}>
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

const mapDispatchToProps = {focusApp, sortApps, loadAppsThunk, createAppThunk, saveAppThunk}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)