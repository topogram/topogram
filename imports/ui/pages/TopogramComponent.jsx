import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import TopBar from '/imports/ui/components/topBar/TopBar.jsx'
import SideNav from '/imports/ui/components/sideNav/SideNav.jsx'
import MainViz from '/imports/ui/components/mainViz/MainViz.jsx'
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
    this.props.loadTopogram(this.props.params.topogramId);
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
    return (
      <div>
        <TopBar
          onHomeButtonClick={this.toggleSideNav}
          promptSnackbar={this.promptSnackbar}
          elements={this.props.elements}
          />
        <SideNav
          ref="sideNav"
          topogramId={ this.props.topogramId }
          topogramTitle={ this.props.topogram.name }
          nodes={ this.props.nodes }
          edges={ this.props.edges }
        />
        <MainViz
          nodes={ this.props.nodes }
          edges={ this.props.edges }
        />

        {/*
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
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array,
  topogram: React.PropTypes.object
}
