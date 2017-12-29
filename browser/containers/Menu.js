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
      <div className="col-sm-12 no-gutters nav-bottom-bar">
        <Link to='/applications' className="menu-item col-sm-2"><h4>Applications</h4></Link>
        <Link to='/buyouts' className="menu-item col-sm-2"><h4>Buyouts</h4></Link>
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/dealers' className="menu-item col-sm-2"><h4>Dealers</h4></Link>
        : null}
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/branches' className="menu-item col-sm-2"><h4>Branches</h4></Link>
        : null}
    
        {(this.props.user.level === 'Admin') ? 
        <Link to='/regions' className="menu-item col-sm-2"><h4>Regions</h4></Link>
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