import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Cytoscape from './Cytoscape.jsx'
import NetworkDefaultStyle from './NetworkDefaultStyle'

import { nodeMove } from '/imports/api/nodes/nodesMethods'



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
      .on('tap', 'node', e => e.cyTarget.data('selected') ?
        this.props.unselectElement(e.cyTarget.json())
        :
        this.props.selectElement(e.cyTarget.json())
      )
      .on('tap', 'edge', e => e.cyTarget.data('selected') ?
        this.props.unselectElement(e.cyTarget.json())
        :
        this.props.selectElement(e.cyTarget.json())
      )
      .on('free','node', e => {
        let node = e.cyTarget
        let position = node.position()
        const topogramId = this.props.topogramId

        // Truncate postion values to integers
        Object.keys(position).map( n => position[n] = Math.trunc(position[n]))
        nodeMove.call({ topogramId : topogramId, nodeId : node.id(), position : position})
      })
  }

  setUpGrabFreeEvents() {
    this.refs.graph.getCy()
      .off('free', 'node')  // reset
      .off('free', 'edge')  // reset
      .off('tap', 'node')
      .on('grab', 'node', e => this.props.onFocusElement(e.cyTarget.json()))
      .on('free', 'node', () => this.props.onUnfocusElement())
      .on('tapstart', 'edge', e => this.props.onFocusElement(e.cyTarget.json()))
      .on('tapend', 'edge', () => this.props.onUnfocusElement())
  }

  componentDidMount() {

    const cy = this.refs.graph.getCy()

    // set default events
    cy.on('mouseover', 'node', e => {

      const node = e.cyTarget
      //console.log("WANT STATE?",this.state)
      //console.log("HERE PROPS:",this.props)
      node.style({
        'border-width': 2,
        'font-size' : this.props.ui.fontSizeNetwork ? 1.5*this.props.ui.fontSizeNetwork : 6,
        'color' : 'grey',
        'label'(d) {
          return d.data('name') ? d.data('name') : ''
        },
        'z-index': 300000
      })
      if (!this.props.ui.isolateMode) {
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
      }
    })
    .on('mouseout', 'node', e => {
        e.cyTarget.style({
          'border-width'(d) {
            return (d.data('group') == 'ghosts') ? 3 : 0
          },
          'font-size' : this.props.ui.fontSizeNetwork ? this.props.ui.fontSizeNetwork : 40,
          'color' : 'black',
          'text-wrap': 'ellipsis',
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
      if(!this.props.ui.isolateMode) {
        cy.edges().css({ 'opacity' : '.7' })
        //cy.nodes().css({'font-size': this.props.ui.fontSizeNetwork})

      }
    })

    // set grab / free events
    if (!this.props.ui.isolateMode)  {this.setUpClickEvents()}
    else {this.setUpGrabFreeEvents()}

    // store cytoscape object
    this.props.updateUI('cy', cy)
    this.cy = cy
    //console.log(this.props);
  }

  shouldComponentUpdate(nextProps) {

    let shouldUpdate = false

    const {
      nodeRadius,
      layoutName,
      filterPanelIsOpen,
      selectedNodeCategories,
      isolateMode
    } = nextProps.ui

    const { nodes, edges } = nextProps

    if (nextProps.width !== this.props.width) return true
    if (nextProps.height !== this.props.height) return true

    // selection mode : update events
    // if ( this.props.ui.filterPanelIsOpen !== filterPanelIsOpen) {
    if ( this.props.ui.isolateMode !== isolateMode) {
      !isolateMode ?
        this.setUpClickEvents() // console.log('click mode')
        :
        this.setUpGrabFreeEvents() // console.log('grab/free mode')
    }

    // list of checks

    if ( this.props.ui.layoutName !== layoutName) shouldUpdate = true
    if ( this.props.ui.nodeRadius !== nodeRadius) shouldUpdate = true
    if ( this.props.nodes.length !== nodes.length) shouldUpdate = true
    if ( this.props.edges.length !== edges.length) shouldUpdate = true
    //FOR BANDSTOUR MAPS
    if ( this.props.nodes.style !== nodes.style) {
    console.log("styles of nodes not matching");

      shouldUpdate = true
}
    // selected CATEGORIES
    if ( this.props.ui.selectedNodeCategories.length !== selectedNodeCategories.length) shouldUpdate = true

    if ( (!!nodes.length && edges.length) && !this.state.init) {
      shouldUpdate = true
      this.setState({ init : true })
    }

    // TODO : proper nodes/edges diff...
    this.props.nodes.forEach((el, ix) => {
                                if ( JSON.stringify(el) != JSON.stringify(nodes[ix]) ) {
                                  shouldUpdate = true
                                }
    })

    return shouldUpdate
    //return true
  }

  componentDidUpdate() {
    this.refs.graph.getCy().resize().fit()
  }

  render() {

    const {
      nodes,
      height,
      edges,
      width
    } = this.props

    const {
      layoutName,
      nodeRadius
    } = this.props.ui

    const elements = {
      nodes: [],
      edges : []
    }
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
  topogramId : PropTypes.string.isRequired,
  nodes : PropTypes.array,
  nodesReady : PropTypes.bool,
  edges : PropTypes.array,
  edgesReady : PropTypes.bool,
  style : PropTypes.object,
  layoutName : PropTypes.string,
  onFocusElement : PropTypes.func.isRequired,
  onUnfocusElement : PropTypes.func.isRequired,
  selectElement: PropTypes.func.isRequired,
  unselectElement: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
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
