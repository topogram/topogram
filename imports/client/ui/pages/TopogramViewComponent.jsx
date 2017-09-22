import React from 'react'
import ui from 'redux-ui'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import TopogramTitle from '/imports/client/ui/components/topogramTitle/TopogramTitle.jsx'
import MainViz from '/imports/client/ui/components/mainViz/MainViz.jsx'
import SideNav from '/imports/client/ui/components/sideNav/SideNav.jsx'


@ui({
  state: {
    filterPanelIsOpen: true,
    filters: []
  }
})
export class TopogramViewComponent extends React.Component {

  static propTypes = {
    ui: React.PropTypes.object,
    updateUI: React.PropTypes.func,
    topogramId: React.PropTypes.string,
    nodes: React.PropTypes.array,
    edges: React.PropTypes.array,
    topogram: React.PropTypes.object
  }

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
    const { networkVisible, mapVisible } = this.state

    let topogramName = this.props.topogram.name ?
      this.props.topogram.name : ''

    console.log(this.props);
    return (
      <div>

        <TopogramTitle topogramName={topogramName} />
        <MainViz
          nodes={ this.props.nodes }
          edges={ this.props.edges }
        />
        { this.props.ui.filterPanelIsOpen ?
          <SideNav
            topogramId={ this.props.topogramId }
            topogramTitle={ this.props.topogram.name }
            nodes={ this.props.nodes }
            edges={ this.props.edges }
          />
          :
          null
        }
      </div>
    )
  }
}
