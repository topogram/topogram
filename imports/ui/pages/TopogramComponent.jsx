import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import TopBar from '/imports/ui/components/topBar/TopBar.jsx'
import SideNav from '/imports/ui/components/sideNav/SideNav.jsx'
import Network from '/imports/ui/components/network/Network.jsx'
import TopogramTitle from '/imports/ui/components/topogramTitle/TopogramTitle.jsx'

import { Topograms, Nodes, Edges } from '/imports/api/collections.js'


const tmpStyle = { }

export class TopogramComponent extends React.Component {
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

  componentDidMount() {
    this.props.loadNodes(this.props.params.topogramId);
    this.props.loadEdges(this.props.params.topogramId);
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
          elements={this.props.elements}
          />
        <SideNav
          ref="sideNav"
          elements={this.props.elements}
          topogram={this.props.topogram}
          topogramId={this.props.params.topogramId}
        />
        {/*
        <TopogramTitle
          topogram={this.props.topogram}
          promptSnackbar={this.promptSnackbar}
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
        /> */}
      </div>
    )
  }
}

TopogramComponent.propTypes = {
  topogramId: React.PropTypes.string,
  elements: React.PropTypes.object,
  topogram: React.PropTypes.object
}
