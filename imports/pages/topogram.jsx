import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import TopBar from '../client/components/topBar/TopBar.jsx'
import SideNav from '../client/components/sideNav/SideNav.jsx'
import Network from '../client/components/network/Network.jsx'

import { Topograms, Nodes, Edges } from '../api/collections.js'


const tmpStyle = { }

function topogramComposer(props, onData) {

  const topoSub = Meteor.subscribe('topogram', props.topogramId)

  if (topoSub.ready()) {
    const nodes = Nodes.find().fetch()
    const edges = Edges.find().fetch()
    const elements = { nodes, edges }

    const topogram = Topograms.findOne(props.topogramId)
    onData(null, { elements, topogram }) // args: err
  }
}

class TopogramSingle extends React.Component {
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
    // console.log(this.props.elements)
    return (
      <div>
        <TopBar
          onHomeButtonClick={this.toggleSideNav}
          promptSnackbar={this.promptSnackbar}
          topogram={ this.props.topogram }
          />
        <SideNav
          ref="sideNav"
        />
        <Network
          topogramId={ this.props.topogramId }
          elements={ this.props.elements }
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

TopogramSingle.propTypes = {
  topogramId: React.PropTypes.string,
  elements: React.PropTypes.object,
  topogramName: React.PropTypes.string
}

const TopogramPage = composeWithTracker(topogramComposer)(TopogramSingle)
export default TopogramPage
