import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class MenuContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.whereAmI = this.whereAmI.bind(this)
  }

  whereAmI(place) {
    let here = window.location.href.split('/')
    if (here[here.length - 1] === place) return ' menu-shade'
    else return ''
  }

  render() {
    return (
      <div className="col-sm-12 no-gutters nav-bottom-bar">
        <Link to='/applications' className={
          `col-sm-2 menu-item${this.whereAmI('applications')}`
        }><h4>Applications</h4></Link>

        <Link to='/buyouts' className={
          `col-sm-2 menu-item${this.whereAmI('buyouts')}`
        }><h4>Buyouts</h4></Link>
    
        {(this.props.user && this.props.user.level === 'Admin') ? 
        <Link to='/dealers' className={
          `col-sm-2 menu-item${this.whereAmI('dealers')}`
        }><h4>Dealers</h4></Link>
        : null}
    
        {(this.props.user && this.props.user.level === 'Admin') ? 
        <Link to='/regions' className={
          `col-sm-2 menu-item${this.whereAmI('regions')}`
        }><h4>Regions</h4></Link>
        : null}
    
        {(this.props.user && this.props.user.level === 'Admin') ? 
        <Link to='/branches' className={
          `col-sm-2 menu-item${this.whereAmI('branches')}`
        }><h4>Branches</h4></Link>
        : null}

        {(this.props.user && this.props.user.level === 'Admin') ? 
        <Link to='/users' className={
          `col-sm-2 menu-item${this.whereAmI('users')}`
        }><h4>Users</h4></Link>
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