import React from 'react'
import {connect} from 'react-redux'

import axios from 'axios'

class ApplicationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>
        <h2>Applications</h2>
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
            {this.props.apps.map(app => {
              return (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{app.customerName}</td>
                  <td>{app.customerAddress}</td>
                  <td>{app.amount}</td>
                  <td>{app.status}</td>
                  <td>{app.expiry}</td>
                  <td>{app.rep.fullName}</td>
                  <td>Edit</td>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsContainer)