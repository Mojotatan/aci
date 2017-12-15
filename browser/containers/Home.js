import React from 'react'
import {connect} from 'react-redux'

class HomeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if (!this.props.token) this.props.history.push('/')
  }

  render() {
    return(
      <main>
        <h2>This is the main landing page, i guess</h2>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)