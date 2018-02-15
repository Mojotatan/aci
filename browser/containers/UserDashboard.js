import React from 'react'
import {connect} from 'react-redux'

import Menu from './Menu'

import {focusUser, createUser, sortUsers, loadUsersThunk} from '../store/users-reducer'

class UsersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
    this.handleNewUser = this.handleNewUser.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  handleClick(e) {
    this.props.focusUser(Number(e.target.id))
    this.props.history.push('/edit-user')
  }

  handleNewUser(e) {
    this.props.createUser({
      id: 'new'
    })
    this.props.history.push('/edit-user')
  }

  handleSort(e) {
    this.props.sortUsers(e.target.id.split('-'))
    this.setState({sortingBy: e.target.id})
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    else this.props.loadUsersThunk(this.props.token)
  }

  render() {
    return(
      <div className="ex-table">
        <Menu />
        <div className="col-sm-12 no-gutters user-header-top">
          <div><h2 className="user-title">Current Users</h2></div>
          <div className="newuser"><button className="user-button" onClick={this.handleNewUser}>Create User</button></div>
        </div>
        <div className="col-sm-12 no-gutters margin-drop">
          <table className="user-table">
            <tbody>
              <tr className="user-header-bottom" key="head">
                <td id="fullName" className={(this.props.sort.join('-') === "fullName") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Name</td>
                <td id="email" className={(this.props.sort.join('-') === "email") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Email</td>
                <td id="level" className={(this.props.sort.join('-') === "level") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Level</td>
                <td id="dealer-name" className={(this.props.sort.join('-') === "dealer-name") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Dealer</td>
                <td id="manager-fullName" className={(this.props.sort.join('-') === "manager-fullName") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Manager</td>
                <td id="active" className={(this.props.sort.join('-') === "active") ? 'sorting' : 'sortable'} onClick={this.handleSort}>Active</td>
                <td></td>
              </tr>
              {this.props.users.map((user, index) => {

                return (
                  <tr key={user.id} className={(index % 2 === 0) ? 'even' : 'odd'} >
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.level}</td>
                    <td>{(user.dealer) ? user.dealer.name : ''}</td>
                    <td>{(user.manager) ? user.manager.fullName: ''}</td>
                    <td>{user.active}</td>
                    <td id={index} onClick={this.handleClick} className="edit table-right">Edit</td>
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
    users: state.users.users,
    sort: state.users.sort
  }
}

const mapDispatchToProps = {focusUser, createUser, sortUsers, loadUsersThunk}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)