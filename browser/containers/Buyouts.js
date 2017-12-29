import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusByo, createByo, sortByos} from '../store/buyout-reducer'

import {getDate} from '../utility'

class BuyoutsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
    this.handleNewByo = this.handleNewByo.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleResubmit = this.handleResubmit.bind(this)
  }

  handleClick(e) {
    this.props.focusByo(Number(e.target.id))
    this.props.history.push('/edit-buyout')
  }

  handleNewByo(e) {
    this.props.createByo({
      id: 'new',
      status: 'Draft',
      date: getDate(),
      rep: this.props.user,
      leases: []
    })
    this.props.history.push('/edit-buyout')
  }

  handleSort(e) {
    this.props.sortByos(e.target.id.split('-'))
    this.setState({sortingBy: e.target.id})
  }

  handleResubmit(e) {
    let byo = this.props.byos[e.target.id]
    this.props.createByo({
      id: 'new',
      status: 'Draft',
      date: getDate(),
      rep: this.props.user,
      quote: byo.quote,
      comments: byo.comments,
      // Machine???
    })
    this.props.history.push('/edit-buyout')
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <Menu />
        <div className="col-sm-12 no-gutters app-header-top">
          <div><h2 className="app-title">Current Buyouts</h2></div>
          <div className="newapp"><button className="app-button" onClick={this.handleNewByo}>Start New Buyout</button></div>
        </div>
        <div className="col-sm-12 no-gutters">
          <table className="app-table" id="thetable">
            <tbody>
              <tr className="app-header-bottom" key="head">
                <td id="date" onClick={this.handleSort}>Date Submitted</td>
                <td>Customer Name</td>
                <td>Address</td>
                <td>{/*Deliberately Blank*/}</td>
                <td id="status" onClick={this.handleSort}>Status</td>
                <td id="expiry" onClick={this.handleSort}>Expires</td>
                <td id="rep-fullName" onClick={this.handleSort}>Rep Name</td>
                <td></td>
                <td></td>
              </tr>
              {this.props.byos.map((byo, index) => {
                return (
                  <tr key={byo.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                    <td>{byo.date}</td>
                    <td>{(byo.customer) ? byo.customer.name : ''}</td>
                    <td>{(byo.customer) ? byo.customer.street : ''}</td>
                    <td>{/*Deliberately Blank*/}</td>
                    <td>{byo.status}</td>
                    <td>{byo.expiry}</td>
                    <td>{(byo.rep) ? byo.rep.fullName : ''}</td>
                    <td id={index} onClick={this.handleClick}>
                      {(this.props.user.level === 'Admin' || byo.status === 'Draft') ?
                        'Edit' : 'View'
                      }
                    </td>
                    {/* <td>
                      {(byo.pdf) ?
                        <a href={byo.pdf} download>PDF</a>
                        : ''
                      }
                    </td> */}

                    <td id={index} onClick={(byo.status === "Expired") ?
                      this.handleResubmit : function(){}}>
                      {(byo.status === "Expired") ?
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
    byos: state.byo.byos
  }
}

const mapDispatchToProps = {focusByo, createByo, sortByos}

export default connect(mapStateToProps, mapDispatchToProps)(BuyoutsContainer)