import React, { PropTypes } from 'react'

import store from './store'

import MainViz from './components/mainViz/MainViz.jsx'
import TitleBox from './components/TitleBox.jsx'
import SidePanel from './components/SidePanel/SidePanel.jsx'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ExploreIcon from 'material-ui/svg-icons/action/explore';

export class TopogramViewComponent extends React.Component {

  static propTypes = {
    ui: PropTypes.object,

    hasTimeInfo: PropTypes.bool,
    hasGeoInfo: PropTypes.bool,
    maxTime: PropTypes.instanceOf(Date),
    minTime: PropTypes.instanceOf(Date),
    nodeCategories: PropTypes.array,

    nodes: PropTypes.array,
    edges: PropTypes.array,
    config: PropTypes.object,

    // loadTopogram : PropTypes.func.isRequired,
    loadNodes : PropTypes.func.isRequired,
    loadEdges : PropTypes.func.isRequired
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
    this.props.loadConfig()
    this.props.loadNodes()
    this.props.loadEdges()
  }

  openSidePanel = () =>
    store.dispatch({
      type: 'FILTER_PANEL_OPEN'
    })

  handleEnterIsolateMode = () => {

    const {
      cy,
      selectedElements,
      isolateMode
    } = this.props.ui

    // store previous nodes position
    const prevPositions = {}
    if (!isolateMode) {
      cy.nodes().forEach(n =>
        prevPositions[n.id()] = {...n.position()}
      )
      store.dispatch({
        type : 'PREV_POSITIONS_SET',
        prevPositions : { ...prevPositions }
      })
    }

    // isolate mode ON
    store.dispatch({
      type : 'ISOLATE_MODE_ENTER'
    })

    // get my nodes/edges
    const selectedIds = selectedElements.map(e => e.data.id)
    const focusedNodes = cy.filter((i, e) =>
      selectedIds.includes(e.id())
    )

    cy.nodes().style({ 'opacity': '0' });
    cy.edges().style({ 'opacity': '0' });

    // select
    var subGraph = focusedNodes.openNeighborhood();
    focusedNodes.style({ 'opacity': '1' });
    subGraph.style({ 'opacity': '1'});

    // apply focus layout
    subGraph.layout({
      'name':"spread",
      'minDist' : 30,
      'padding' : 50
    })
  }

  handleExitIsolateMode = () => {

    const {
      cy,
      prevPositions
    } = this.props.ui

    // isolate mode ON
    store.dispatch({
      type : 'ISOLATE_MODE_EXIT'
    })

    // show all again
    cy.nodes().style({ 'opacity': '1' });
    cy.edges().style({ 'opacity': '1' });

    // bring back positions
    cy.nodes().positions((i,n) => prevPositions[n.id()])

    store.dispatch({
      type : 'PREV_POSITIONS_CLEAR'
    })

    cy.fit()
  }

  onFocusElement = (el) => store.dispatch({
    type : 'FOCUS_ELEMENTS',
    'focusElement' : el
  })

  onUnfocusElement = () => store.dispatch({
    type : 'FOCUS_ELEMENTS',
    'focusElement' : null
  })

  selectElement = (el) => {

    el.data.selected = true

    const { cy } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', true)

    store.dispatch({
      type : 'SELECT_ELEMENTS',
      selectedElements : [...this.props.ui.selectedElements, el]
    })

  }

  unselectElement = (el) => {

    el.data.selected = false

    const { cy, isolateMode } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', false)

    const {selectedElements} = this.props.ui

    const remainingElements = [...
        selectedElements.filter(n =>
          !(
            n.data.id === el.data.id
            &&
            n.group === el.group
          )
        )
    ]

    store.dispatch({
      type : 'SELECT_ELEMENTS',
      selectedElements : remainingElements
    })

    // console.log(remainingElements, isolateMode);

    if(!remainingElements.length && isolateMode)
      this.handleExitIsolateMode()
  }

  unselectAllElements = () => {
    const { cy, selectedElements } = this.props.ui

    cy.elements().data('selected', false)
    selectedElements.forEach(el=> el.data.selected = false)

    store.dispatch({
      type : 'SELECT_ELEMENTS',
      selectedElements : []
    })

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
    //   store.dispatch({
    //     type: 'SHOW_TIMELINE'
    //   })

    const {
      ui,
      hasTimeInfo,
      nodeCategories,
      minTime,
      maxTime
    } = this.props

    if (hasTimeInfo && !ui.minTime && !ui.maxTime) {
      // pass value to UI as default
      store.dispatch({
        type: 'SET_MIN_TIME',
        minTime
      })

      store.dispatch({
        type: 'SET_MAX_TIME',
        maxTime
      })

      store.dispatch({
        type: 'SET_CURRENT_SLIDER_TIME',
        currentSliderTime: maxTime
      })

    }

    // default value to all
    if (nodeCategories && !ui.selectedNodeCategories.length)
      store.dispatch({
        type: 'SET_NODES_SELECTED_CATEGORIES',
        selectedNodeCategories: nodeCategories
      })

  }

  render() {

    const {
      hasTimeInfo,
      nodeCategories
    } = this.props

    const {
      minTime,
      maxTime,
      currentSliderTime,
      selectedNodeCategories
    } = this.props.ui

    const filterTime = (n) => hasTimeInfo ?
      new Date(maxTime) >= new Date(n.data.end)
      && new Date(currentSliderTime) >= new Date(n.data.end)
      && new Date(n.data.start) >= new Date(minTime)
      :
      true

    const filterCategories = (n) => !!nodeCategories.length ?
      selectedNodeCategories.includes(n.data.group)
      :
      true

    const selectedIds = this.props.ui.selectedElements.map(d=>d.data.id)
    const nodes =  this.props.nodes.filter(n =>
        filterTime(n)
        && filterCategories(n)
      )
      .map(n => {
        let selected = selectedIds.includes(n.data.id)
        let node = Object.assign( {}, n)
        node.data.selected = selected
        return node
      })

    const nodeIds = nodes.map(n => n.data.id)

    const edges = this.props.edges
      .filter(e =>
        nodeIds.includes(e.data.source) && nodeIds.includes(e.data.target)
      )
return (
      <div>

        <FloatingActionButton
          style={{
            position: 'fixed',
            right: '20px',
            top: '20px'
          }}
          onClick={this.openSidePanel}
          >
          <ExploreIcon />
        </FloatingActionButton>

        <MainViz
          nodes={ nodes }
          edges={ edges }
          onFocusElement={this.onFocusElement}
          onUnfocusElement={this.onUnfocusElement}
          onClickElement={this.onClickElement}
          selectElement={this.selectElement}
          unselectElement={this.unselectElement}
          unselectAllElements={this.unselectAllElements}
          hasTimeInfo={ this.props.hasTimeInfo }
          hasGeoInfo={ this.props.hasGeoInfo }
          ui={this.props.ui}
        />

        <TitleBox
          topogramTitle={ this.props.config.title }
          selectedElements={this.props.ui.selectedElements}
          focusElement={this.props.ui.focusElement}
          cy={this.props.ui.cy}
          onFocusElement={this.onFocusElement}
          onUnfocusElement={this.onUnfocusElement}
          isolateMode={this.props.ui.isolateMode}
          handleEnterIsolateMode={this.handleEnterIsolateMode}
          handleExitIsolateMode={this.handleExitIsolateMode}
          selectElement={this.selectElement}
          unselectAllElements={this.unselectAllElements}
          unselectElement={this.unselectElement}
        />

        <SidePanel
          nodes={ nodes }
          edges={ edges }
          topogram={ this.props.config }
          nodeCategories={this.props.nodeCategories}

          ui={this.props.ui}

          hasTimeInfo={ this.props.hasTimeInfo }
          hasGeoInfo={ this.props.hasGeoInfo }

          open={this.props.ui.filterPanelIsOpen}

          authorIsLoggedIn={ true }

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
