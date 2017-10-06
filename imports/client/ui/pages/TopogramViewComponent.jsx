import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import MainViz from '/imports/client/ui/components/mainViz/MainViz.jsx'
import TitleBox from '/imports/client/ui/components/TitleBox.jsx'
import SidePanel from '/imports/client/ui/components/SidePanel/SidePanel.jsx'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
    // network/map
    layoutName : 'preset',
    nodeRadius : 'degree',
    geoMapTile : 'default',
    // selection
    selectedElements : [],
    focusElement: null,
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
    this.toggleTitleBox = this.toggleTitleBox.bind(this)

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

  handleToggleSelectionMode = () => {
    this.props.updateUI('filterPanelIsOpen', !this.props.ui.filterPanelIsOpen)
  }

  onFocusElement = (el) => {
    console.log('focus');
    this.props.updateUI('focusElement', el)


    const { cy } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    let focusedNodes = cy.filter(filter) //.data('selected', true)

    // cy.nodes().style({ 'opacity': '.1' });
    // cy.edges().style({ 'opacity': '.1' });
    //
    // // select
    // var subGraph = focusedNodes.closedNeighborhood();
    // focusedNodes.style({ 'opacity': '1' });
    // subGraph.style({ 'opacity': '1'});
    //
    // // store previous positions
    // subGraph.nodes().forEach( d => d.data("prevPos", { ...d.position() }))
    //
    // // apply focus layout
    // subGraph.layout({"name":"concentric"})

  }

  onUnfocusElement = () => {

    this.props.updateUI('focusElement', null)

    const { cy } = this.props.ui

    // cy.nodes().style({ "opacity": '1' });
    // cy.edges().style({"opacity": '1'});
    //
    // // bring back previous positions
    // cy.nodes().forEach(d => {
    //   if( d.data("prevPos") ) {
    //     d.position(d.data("prevPos"))
    //     delete d.removeData("prevPos")
    //   }
    // })
    //
    // cy.layout({"name":"preset"})

  }

  selectElement = (el) => {

    el.data.selected = true

    const { cy } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', true)

    this.props.updateUI(
      'selectedElements',
      [...this.props.ui.selectedElements, el]
    )

  }

  unselectElement = (el) => {

    el.data.selected = false

    const { cy } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', false)

    const {selectedElements} = this.props.ui

    this.props.updateUI('selectedElements',
      selectedElements.filter(n =>
        n.data.id !== el.data.id && n.group === el.group
      )
    )
  }

  unselectAllElements = () => {
    const { cy, selectedElements } = this.props.ui

    cy.elements().data('selected', false)
    selectedElements.forEach(el=> el.data.selected = false)

    this.props.updateUI('selectedElements', [])

  }

  toggleTitleBox() {
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
      nodeCategories,
      minTime,
      maxTime
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

    const {
      hasTimeInfo,
      nodeCategories
    } = this.props

    const filterTime = (n) => hasTimeInfo ?
      new Date(this.props.ui.maxTime) >= new Date(n.data.end)
      && new Date(this.props.ui.currentSliderTime) >= new Date(n.data.end)
      && new Date(n.data.start) >= new Date(this.props.ui.minTime)
      :
      true

    const filterCategories = (n) => !!nodeCategories.length ?
      this.props.ui.selectedNodeCategories.includes(n.data.group)
      :
      true

    const nodes =  this.props.nodes.filter(n =>
        filterTime(n)
        && filterCategories(n)
      )

    const nodeIds = nodes.map(n => n.data.id)

    const edges = this.props.edges
      .filter(e =>
        nodeIds.includes(e.data.source) && nodeIds.includes(e.data.target)
      )

    // console.log(this.props.userId, this.props.topogram.userId, this.props.isLoggedIn);
    // console.log(this.props.userId === this.props.topogram.userId && this.props.isLoggedIn);

    return (
      <div>

        <FloatingActionButton
          style={{
            position: 'fixed',
            right: '20px',
            top: '20px'
          }}
          onClick={this.handleToggleSelectionMode}
          >
          <ContentAdd />
        </FloatingActionButton>

        <MainViz
          nodes={ nodes }
          edges={ edges }
          hasTimeInfo={ this.props.hasTimeInfo }
          hasGeoInfo={ this.props.hasGeoInfo }
          focusElement={this.onFocusElement}
          unFocusElement={this.onUnfocusElement}
          onClickElement={this.onClickElement}
          selectElement={this.selectElement}
          unselectElement={this.unselectElement}
          unselectAllElements={this.unselectAllElements}
        />

        <TitleBox
          topogramTitle={ this.props.topogram.title }
        />

        <SidePanel
          nodes={ nodes }
          edges={ edges }
          topogram={ this.props.topogram }
          nodeCategories={this.props.nodeCategories}

          open={this.props.ui.filterPanelIsOpen}

          router={this.props.router}
          authorIsLoggedIn={ this.props.userId === this.props.topogram.userId && this.props.isLoggedIn }

          onFocusElement={this.onFocusElement}
          onUnfocusElement={this.onUnfocusElement}
          selectElement={this.selectElement}
          unselectAllElements={this.unselectAllElements}
          unselectElement={this.unselectElement}

        />
      </div>
    )
  }
}
