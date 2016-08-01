import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import TopBar from '../client/components/topBar/TopBar.jsx'
import SideNav from '../client/components/sideNav/SideNav.jsx'
import Network from '../client/components/network/Network.jsx'

import { Nodes, Edges } from '../api/collections.js'


const tmpStyle = { }

function composer(props, onData) {
  const
    edgesSub = Meteor.subscribe('edges', props.topogramId),
    nodesSub = Meteor.subscribe('nodes', props.topogramId)

  if (edgesSub.ready() && nodesSub.ready()) {
    const nodes = Nodes.find().fetch()
    const edges = Edges.find().fetch()
    const elements = { nodes, edges}
    console.log(nodes.length, edges.length)
    onData(null, { elements }) // args: err
  }
}

const NetworkSingle = composeWithTracker(composer)(Network)

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
    console.log(this.props);
    return (
      <div>
        <TopBar
          onHomeButtonClick={this.toggleSideNav}
          promptSnackbar={this.promptSnackbar}
          />
        <SideNav
          ref="sideNav"
        />
        <NetworkSingle
          topogramId={ this.props.topogramId }
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
