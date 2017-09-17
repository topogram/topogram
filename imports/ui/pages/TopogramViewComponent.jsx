import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import RaisedButton from 'material-ui/RaisedButton';

import Network from '/imports/ui/components/network/Network.jsx'
import GeoMap from '/imports/ui/components/geoMap/GeoMap.jsx'
import TopogramTitle from '/imports/ui/components/topogramTitle/TopogramTitle.jsx'

const tmpStyle = { }

export class TopogramViewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.toggleSideNav = this.toggleSideNav.bind(this)

    // snackbar
    this.state = {
      open: false,
      message: '',
      networkVisible: false,
      mapVisible : true
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

  showMap() {
    this.setState({
      networkVisible: false,
      mapVisible : true
    })
  }

  showNetwork() {
    this.setState({
      networkVisible: true,
      mapVisible : false
    })
  }

  render() {
    const { networkVisible, mapVisible } = this.state

    return (
      <div>

        <h1>{this.props.topogram.name}</h1>

        <RaisedButton
          label="Map"
          onClick={ () => this.showMap()}
        />

        <RaisedButton
          label="Network"
          onClick={ () => this.showNetwork()}
        />

        {
          networkVisible ?
            <Network
              topogramId={ this.props.topogramId }
              nodes={ this.props.nodes }
              edges={ this.props.edges }
            />
          :
            null
        }

        {
          mapVisible ?
            <GeoMap
              topogramId={ this.props.topogramId }
              nodes={ this.props.nodes }
              edges={ this.props.edges }
            />
          :
            null
        }


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

TopogramViewComponent.propTypes = {
  topogramId: React.PropTypes.string,
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array,
  topogram: React.PropTypes.object
}
