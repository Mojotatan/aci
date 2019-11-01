import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import EditUser from '../components/EditUser'

import {saveUserThunk, createUser} from '../store/users-reducer'

class UserContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({},
      {password: ''},
      this.props.user,
    )

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange(e) {
    // console.log('state', this.state)
    // console.log('props', this.props)
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'dealerId') {
      this.setState({
        regionId: 0,
        branchId: 0,
        managerId: 0
      })
    } else if (e.target.name === 'regionId') {
      this.setState({
        branchId: 0
      })
    }
  }

  handleSave(e) {
    e.preventDefault()

    this.props.saveUserThunk(this.props.token, this.state, () => {this.props.history.push('/users')})

  }


  componentWillReceiveProps(newProps){
    // console.log('component receiving props', newProps)
    this.setState(newProps.user)
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
    // console.log('state', this.state)
  }


  render() {
    let peckingOrder = (a, b) => {
      // #ascendHigher
      // if (a.level === 'Sales Rep') return true
      // else if (a.level === 'Sales Manager' && b.level !== 'Sales Rep') return true
      // else if (a.level === 'Branch Manager' && b.level !== 'Sales Rep' && b.level !== 'Sales Manager') return true
      // else if (a.level === 'Region Manager' && (b.level === 'Senior Manager' || b.level === 'Region Manager')) return true
      // else if (a.level === 'Senior Manager' && b.level === 'Senior Manager') return true
      if (a.level === 'Sales Rep' && b.level !== 'Sales Rep') return true
      else if (a.level === 'Sales Manager' && b.level !== 'Sales Rep' && b.level !== 'Sales Manager') return true
      else if (a.level === 'Branch Manager' && (b.level === 'Senior Manager' || b.level === 'Region Manager')) return true
      else if (a.level === 'Region Manager' && b.level === 'Senior Manager') return true
      else if (a.level === 'Admin' && b.level === 'Admin') return true
      else return false
    }
    let sameTeams = (a, b) => {
      if ((b.level === 'Sales Manager' || 'Branch Manager') && a.branchId === b.branchId) return true
      else if (b.level === 'Region Manager' && a.regionId === b.regionId) return true
      else if (b.level === 'Senior Manager' || b.level === 'Admin') return true
      else return false
    }
    return(
      <div>
        <EditUser
          values={this.state}
          users={this.props.users.filter(usr => (
            usr.dealerId == this.state.dealerId && usr.id != this.state.id
            && peckingOrder(this.state, usr) && sameTeams(this.state, usr)
          )).sort((a, b) => {
            if (a.fullName > b.fullName) return 1
            else return -1
          })}
          dealers={this.props.dealers}
          regions={this.props.regions.filter(reg => (reg.dealerId == this.state.dealerId))}
          branches={this.props.branches.filter(bran => (bran.regionId == this.state.regionId))}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    users: state.users.users,
    user: state.users.users[state.users.focus],
    dealers: state.dlr.dealers,
    regions: state.region.regions,
    branches: state.branch.branches
  }
}

const mapDispatchToProps = {saveUserThunk, createUser}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)