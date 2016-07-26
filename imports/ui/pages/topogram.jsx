import React from 'react'

import TopBar from '../components/topBar/TopBar.jsx'
import SideNav from '../components/sideNav/SideNav.jsx'


class TopogramPage extends React.Component {
  constructor(props) {
    super(props)
    this.toggleSideNav = this.toggleSideNav.bind(this)
  }

  toggleSideNav() {
    const toggled = this.refs.sideNav.state.open ? false : true
    this.refs.sideNav.setState({ open : toggled })
  }

  render() {
    return (
      <div>
        <TopBar onHomeButtonClick={this.toggleSideNav} />
        <SideNav
          ref="sideNav"
        />
        <p>
          Hello { this.props.topogramId }
        </p>
      </div>
    )
  }
}

TopogramPage.propTypes = {
  topogramId: React.PropTypes.string
}

export default TopogramPage
