import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Cytoscape from './Cytoscape.jsx'
import NetworkDefaultStyle from './NetworkDefaultStyle'

// import { nodeMove } from '/imports/api/nodes/nodesMethods'

@ui()
class Network extends React.Component {

  constructor(props) {
    super(props)
    this.state = { init : false }
  }

  setUpClickEvents() {
    this.refs.graph.getCy()
      .off('grab', 'node')  // reset
      .off('free', 'node')  // reset
      .off('tapstart', 'edge')  // reset
      .off('tapend', 'edge')  // reset
      .on('tap', 'node', e => this.props.onClickElement(e.cyTarget))
      .on('tap', 'edge', e => this.props.onClickElement(e.cyTarget))
  }

  setUpGrabFreeEvents() {
    this.refs.graph.getCy()
      .off('free', 'node')  // reset
      .off('free', 'edge')  // reset
      .off('tap', 'node')
      .on('grab', 'node', e => this.props.selectElement(e.cyTarget))
      .on('free', 'node', () => this.props.unselectAllElements())
      .on('tapstart', 'edge', e => this.props.selectElement(e.cyTarget))
      .on('tapend', 'edge', () => this.props.unselectAllElements())
  }

  componentDidMount() {

    const cy = this.refs.graph.getCy()

    // set default events
    cy.on('mouseover', 'node', e => {
      const node = e.cyTarget
      node.style({
        'border-width': 2,
        'font-size' : 8,
        'color' : 'black',
        'label'(d) {
          return d.data('name') ? d.data('name') : ''
        },
        'z-index': 300000
      })
      const edges = e.cyTarget.connectedEdges()
      edges.css({
        // 'line-color' : function(d) {
        //     return d.style('line-color') == "#D84315" ? "#AAAAAA" : "#D84315"
        //   },
        'opacity' : '1'
      })
      cy.edges().difference( edges ).css({
        'opacity' : '.2'
      })
    })
      .on('mouseout', 'node', e => {
        e.cyTarget.style({
          'border-width'(d) {
            return (d.data('group') == 'ghosts') ? 3 : 0
          },
          'font-size' : 6,
          'color' : 'gray',
          'label'(d) {
            return d.data('name') ? d.data('name').trunc(20) : ''
          }
        })
        // e.cyTarget.connectedEdges().css({
        //   'line-color' : function() {
        //       return "#AAAAAA"
        //     }
        // })
        // reset opacity
        cy.edges().css({ 'opacity' : '.7' })
      })

    // set grab / free events
    if (this.props.ui.selectionModeOn) {this.setUpClickEvents()}
    else {this.setUpGrabFreeEvents()}

    // store cytoscape object
    this.props.updateUI('cy', cy)
    this.cy = cy
  }

  shouldComponentUpdate(nextProps) {

    let shouldUpdate = false

    const { nodeRadius, layoutName, selectionModeOn } = nextProps.ui
    const { nodes, edges } = nextProps

    if (nextProps.width !== this.props.width) return true
    if (nextProps.height !== this.props.height) return true

    // selection mode : update events
    if ( this.props.ui.selectionModeOn !== selectionModeOn) {
      selectionModeOn ?
        this.setUpClickEvents() // console.log('click mode')
        :
        this.setUpGrabFreeEvents() // console.log('grab/free mode')
    }

    // list of checks
    if ( this.props.ui.layoutName !== layoutName) shouldUpdate = true
    if ( this.props.ui.nodeRadius !== nodeRadius) shouldUpdate = true
    if ( this.props.nodes.length !== nodes.length) shouldUpdate = true
    if ( this.props.edges.length !== edges.length) shouldUpdate = true

    if ( (!!nodes.length && edges.length) && !this.state.init) {
      shouldUpdate = true
      this.setState({ init : true })
    }

    // TODO : proper nodes/edges diff...
    return shouldUpdate
  }

  componentDidUpdate() {
    this.refs.graph.getCy().resize().fit()
  }

  render() {

    // make sure nodes & edges are there
    const { nodes, height, edges, width } = this.props
    const { layoutName, nodeRadius } = this.props.ui

    const elements = {}
    if (nodes.length) elements.nodes = nodes
    if (edges.length) elements.edges = edges

    return (
      <Cytoscape
        ref = "graph"
        elements ={elements}
        init={this.state.init}
        style = {NetworkDefaultStyle()}
        layoutName = {layoutName}
        nodeRadius = {nodeRadius}
        width = {width}
        height = {height}
      />
    )
  }
}

Network.propTypes = {
  nodes : PropTypes.array,
  nodesReady : PropTypes.bool,
  edges : PropTypes.array,
  edgesReady : PropTypes.bool,
  style : PropTypes.object,
  layoutName : PropTypes.string,
  onClickElement: PropTypes.func.isRequired,
  selectElement: PropTypes.func.isRequired,
  unselectAllElements: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.height.isRequired
}

Network.defaultProps = {
  nodes : [],
  nodesReady : false,
  edges : [],
  edgesReady : false,
  style : NetworkDefaultStyle(),
  layoutName : 'preset'
}
export default Network
