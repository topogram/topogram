import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import MainViz from '/imports/client/ui/components/mainViz/MainViz.jsx'
import SideNav from '/imports/client/ui/components/SideNav.jsx'
import SelectionPanel from '/imports/client/ui/components/selectionPanel/SelectionPanel.jsx'

// UI state default values
@ui({
  state: {
    filterPanelIsOpen: true,
    // filters
    minTime : null,
    maxTime : null,
    currentSliderTime : () => new Date().getTime(), // TODO set default to minTime
    selectedNodeCategories: [],
    // viz layout settings
    graphVisible : true, // default to graph view
    geoMapVisible : false,
    timeLineVisible : false,
    // selectionPanelVisible : false,
    // network/map
    layoutName : 'preset',
    nodeRadius : 'degree',
    geoMapTile : 'default',
    // selection
    selectionModeOn : false,
    selectionPanelVisible : false,
    selectedElements : [],
    cy : null // cytoscape graph
  }
})
export class TopogramViewComponent extends React.Component {

  static propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    hasTimeInfo: PropTypes.bool,
    hasGeoInfo: PropTypes.bool,
    maxTime: PropTypes.instanceOf(Date),
    minTime: PropTypes.instanceOf(Date),
    nodeCategories: PropTypes.array,
    nodes: PropTypes.array,
    edges: PropTypes.array,
    topogram: PropTypes.object,
    topogramId: PropTypes.string,
    isLoggedIn : PropTypes.bool,
    userId: PropTypes.string,
    loadTopogram : PropTypes.func.isRequired,
    loadNodes : PropTypes.func.isRequired,
    loadEdges : PropTypes.func.isRequired,
    stopNodesSubscription : PropTypes.func.isRequired,
    stopEdgesSubscription : PropTypes.func.isRequired,
    stopTopogramSubscription : PropTypes.func.isRequired,
    router : PropTypes.object.isRequired,
    params : PropTypes.shape({
      topogramId : PropTypes.string.isRequired
    })
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
    this.props.loadTopogram(this.props.params.topogramId)
    this.props.loadNodes(this.props.params.topogramId)
    this.props.loadEdges(this.props.params.topogramId)
  }

  componentWillUnmount() {
    this.props.stopNodesSubscription()
    this.props.stopEdgesSubscription()
    this.props.stopTopogramSubscription()
  }

  onClickElement = (el) => {
    const { selectedElements } = this.props.ui

    // if already selected, then unselect
    if (selectedElements.map(d=>d.id).includes(el.data.id))
      {this.unselectElement(el)}
    else
      {this.selectElement(el)}
  }

  unselectElement = (el) => {
    el.data.selected = false
    const selectedElements = this.props.ui.selectedElements
      .filter(n => n.id !== el.data.id) // TODO filter by group
    this.props.updateUI('selectedElements', selectedElements)
  }

  selectElement = (el) => {

    el.data.selected = true

    this.props.updateUI(
      'selectedElements',
      [...this.props.ui.selectedElements, el]
    )
    this.props.updateUI( 'selectionPanelVisible', true )
  }

  unselectAllElements = () => {
    this.props.ui.selectedElements.forEach(el=> el.data.selected = false)
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
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

  componentWillUpdate(nextProps) {

    // // show timeline if time info
    // if (this.props.hasTimeInfo)
    //   this.props.updateUI('timeLineVisible', true)

    const {
      ui,
      hasTimeInfo,
      minTime,
      maxTime,
      nodeCategories
    } = this.props

    if (hasTimeInfo && !ui.minTime && !ui.maxTime) {
      // pass value to UI as default
      this.props.updateUI('minTime', minTime)
      this.props.updateUI('maxTime', maxTime)
    }

    // default value to all
    if (nodeCategories && !ui.selectedNodeCategories.length)
      this.props.updateUI('selectedNodeCategories', nodeCategories)

  }

  render() {

    const nodes = this.props.hasTimeInfo ?
      this.props.nodes
        .filter(n => new Date(this.props.ui.maxTime) >= new Date(n.data.end))
        .filter(n => new Date(this.props.ui.currentSliderTime) >= new Date(n.data.end))
        .filter(n => new Date(n.data.start) >= new Date(this.props.ui.minTime))
        .filter(n =>
           this.props.ui.selectedNodeCategories.includes(n.data.group)
         )
      :
      this.props.nodes

    const nodeIds = nodes.map(n => n.data.id)

    const edges = this.props.edges
      .filter(e =>
        nodeIds.includes(e.data.source) && nodeIds.includes(e.data.target)
      )

    // console.log(this.props.userId, this.props.topogram.userId, this.props.isLoggedIn);
    // console.log(this.props.userId === this.props.topogram.userId && this.props.isLoggedIn);

    return (
      <div>

        <MainViz
          nodes={ nodes }
          edges={ edges }
          hasTimeInfo={ this.props.hasTimeInfo }
          hasGeoInfo={ this.props.hasGeoInfo }
          onClickElement={this.onClickElement}
          selectElement={this.selectElement}
          unselectElement={this.unselectElement}
          unselectAllElements={this.unselectAllElements}
        />
        { this.props.ui.filterPanelIsOpen ?
          <SideNav
            topogramId={ this.props.params.topogramId }
            topogramTitle={ this.props.topogram.title }
            authorIsLoggedIn={ this.props.userId === this.props.topogram.userId && this.props.isLoggedIn }
            topogramIsPublic={ this.props.topogram.sharedPublic }
            nodes={ nodes }
            edges={ edges }
            nodeCategories={this.props.nodeCategories}
            router={this.props.router}
          />
          :
          null
        }
        <SelectionPanel
          open={!!this.props.ui.selectionPanelVisible}
          unselectAllElements={this.unselectAllElements}
        />
      </div>
    )
  }
}
