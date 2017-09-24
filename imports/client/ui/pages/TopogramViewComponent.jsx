import React from 'react'
import ui from 'redux-ui'
import Snackbar from 'material-ui/Snackbar'
import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'

import MainViz from '/imports/client/ui/components/mainViz/MainViz.jsx'
import SideNav from '/imports/client/ui/components/sideNav/SideNav.jsx'
import SelectionPanel from '/imports/client/ui/components/selectionPanel/SelectionPanel.jsx'

// UI state default values
@ui({
  state: {
    filterPanelIsOpen: true,
    // filters
    minTime : null,
    maxTime : null,
    // viz layout settings
    graphVisible : false, // default to graph view
    geoMapVisible : true,
    timeLineVisible : true,
    // selectionPanelVisible : false,
    // network/map
    layoutName : 'preset',
    nodeRadius : 'degree',
    geoMapTile : 'default',
    // selection
    selectionPanelVisible : false,
    selectionPanelPinned : false,
    selectedElements : [],
    cy : null // cytoscape graph
  }
})
export class TopogramViewComponent extends React.Component {

  static propTypes = {
    ui: React.PropTypes.object,
    updateUI: React.PropTypes.func,
    topogramId: React.PropTypes.string,
    hasTimeInfo: React.PropTypes.bool,
    maxTime: React.PropTypes.instanceOf(Date),
    minTime: React.PropTypes.instanceOf(Date),
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

  componentWillUpdate() {

    // // show timeline if time info
    // if (this.props.hasTimeInfo)
    //   this.props.updateUI('timeLineVisible', true)

    if (this.props.hasTimeInfo && !this.props.ui.minTime && !this.props.ui.maxTime) {
      // pass value to UI as default
     this.props.updateUI('minTime', this.props.minTime)
     this.props.updateUI('maxTime', this.props.maxTime)
   }
  }

  render() {
    const { networkVisible, mapVisible } = this.state

    let topogramName = this.props.topogram.name ?
      this.props.topogram.name : ''

    let nodes = this.props.hasTimeInfo ?
      this.props.nodes
        .filter(n => new Date(this.props.ui.maxTime) >= new Date(n.data.end))
        .filter(n => new Date(n.data.start) >= new Date(this.props.ui.minTime))
      :
      this.props.nodes

    let nodeIds = nodes.map(n => n.data.id)

    let edges = this.props.edges
      .filter(e =>
        nodeIds.includes(e.data.source) && nodeIds.includes(e.data.target)
      )

    return (
      <div>

        <MainViz
          nodes={ nodes }
          edges={ edges }
          hasTimeInfo={ this.props.hasTimeInfo }
        />
        { this.props.ui.filterPanelIsOpen ?
          <SideNav
            topogramId={ this.props.params.topogramId }
            topogramTitle={ this.props.topogram.name }
            nodes={ nodes }
            edges={ edges }
            router={this.props.router}
          />
          :
          null
        }
        <SelectionPanel
          open={!!this.props.ui.selectionPanelVisible}
          />
      </div>
    )
  }
}
