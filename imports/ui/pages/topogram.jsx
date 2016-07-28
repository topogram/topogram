import React from 'react'
import Snackbar from 'material-ui/Snackbar'

import TopBar from '../components/topBar/TopBar.jsx'
import SideNav from '../components/sideNav/SideNav.jsx'

import InlineEditField from '../components/inlineEdit/InlineEditField.jsx'

const tmpStyle = { }

class TopogramPage extends React.Component {
  constructor(props) {
    super(props)
    this.toggleSideNav = this.toggleSideNav.bind(this)

    // snackbar
    this.state = {
      open: false,
      message: ''
    }
    this.promptSnackbar = this.promptSnackbar.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  toggleSideNav() {
    const toggled = this.refs.sideNav.state.open ? false : true
    this.refs.sideNav.setState({ open : toggled })
  }

  promptSnackbar(msg) {
    this.setState({
      open: true,
      message: msg
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div>
        <TopBar
          onHomeButtonClick={this.toggleSideNav}
          promptSnackbar={this.promptSnackbar}
          />
        <SideNav
          ref="sideNav"
        />
        <p>
          Hello { this.props.topogramId }
        </p>
        <InlineEditField
          defaultValue="Topogram"
          _id={ this.props.topogramId }
          collection="topograms"
          style={tmpStyle}
          promptSnackbar={this.promptSnackbar}
        />

        <InlineEditField
          defaultValue="##Topogram"
          _id={ this.props.topogramId }
          collection="topograms"
          type="textarea"
          style={tmpStyle}
          promptSnackbar={this.promptSnackbar}
        />

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

TopogramPage.propTypes = {
  topogramId: React.PropTypes.string
}

export default TopogramPage
