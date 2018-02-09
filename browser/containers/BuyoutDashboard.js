import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusByo, sortByos, loadByosThunk, createByoThunk} from '../store/buyout-reducer'

import {getDate, reformatDate} from '../utility'

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
    this.props.createByoThunk(this.props.token, () => {this.props.history.push('/edit-buyout')})
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
      comments: byo.comments,
      // Machine???
    })
    this.props.history.push('/edit-buyout')
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else this.props.loadByosThunk(this.props.token)
  }

  render() {
    return(
      <div className="ex-table">
        <Menu />
        <div className="col-sm-12 no-gutters app-header-top">
          <div><h2 className="app-title">Current Buyouts</h2></div>
          <div className="newapp"><button className="app-button" onClick={this.handleNewByo}>Start New Buyout</button></div>
        </div>
        <div className="col-sm-12 no-gutters margin-drop">
          <table className="app-table" id="thetable">
            <tbody>
              <tr className="app-header-bottom" key="head">
                <td id="date" className={(this.props.sort.join('-') === "date") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Date Submitted</td>
                <td id="customer-name" className={(this.props.sort.join('-') === "customer-name") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Customer Name</td>
                <td id="customer-street" className={(this.props.sort.join('-') === "customer-street") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Address</td>
                <td id="status" className={(this.props.sort.join('-') === "status") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Status</td>
                <td id="expiry" className={(this.props.sort.join('-') === "expiry") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Expires</td>
                <td id="rep-fullName" className={(this.props.sort.join('-') === "rep-fullName") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Rep Name</td>
                <td className="table-right"></td>
              </tr>
              {this.props.byos.map((byo, index) => {
                return (
                  <tr key={byo.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                    <td>{reformatDate(byo.date)}</td>
                    <td>{(byo.customer) ? byo.customer.name : ''}</td>
                    <td>{(byo.customer) ? byo.customer.street : ''}</td>
                    <td>{byo.status}</td>
                    <td>{reformatDate(byo.expiry)}</td>
                    <td>{(byo.rep) ? byo.rep.fullName : ''}</td>
                    {(this.props.user.level === 'Admin' || byo.status !== 'Expired') ?
                      <td id={byo.id} onClick={this.handleClick} className="edit table-right">
                        {(this.props.user.level === 'Admin' || byo.status !== 'Working') ?
                          'Edit' : 'View'
                        }
                      </td>
                      :
                      <td id={byo.id} className="edit table-right" onClick={this.handleResubmit}>
                        Resubmit
                      </td>
                    }
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
    byos: state.byo.byos,
    sort: state.byo.sort
  }
}

const mapDispatchToProps = {focusByo, sortByos, loadByosThunk, createByoThunk}

export default connect(mapStateToProps, mapDispatchToProps)(BuyoutsContainer)