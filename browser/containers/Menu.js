import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to='/applications'><h4>Applications</h4></Link>
        <Link to='/buyouts'><h4>Buyouts</h4></Link>
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/dealers'><h4>Dealers</h4></Link>
        : null}
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/branches'><h4>Branches</h4></Link>
        : null}
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/regions'><h4>Regions</h4></Link>
        : null}

        {(this.props.user.level === 'Admin') ? 
        <Link to='/users'><h4>Users</h4></Link>
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)