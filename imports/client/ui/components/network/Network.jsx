import React from 'react'
import cytoscape from 'cytoscape'
import ui from 'redux-ui'

import Cytoscape from './Cytoscape.jsx'
import NetworkDefaultStyle from './NetworkDefaultStyle'

import {nodeMove} from '/imports/api/nodes/nodesMethods'

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
      .on('free', 'node', e => this.props.unselectAllElements())
      .on('tapstart', 'edge', e => this.props.selectElement(e.cyTarget))
      .on('tapend', 'edge', e => this.props.unselectAllElements())
  }

  componentDidMount(){

    const cy = this.refs.graph.getCy()

    // set default events
    cy.on('mouseover', 'node', e => {
        let node = e.cyTarget
        node.style({
            'border-width': 2,
            'font-size' : 8,
            'color' : 'black',
            'label': function(d) {
              return d.data("name") ? d.data("name") : ""
            },
            'z-index': 300000
        })
        let edges = e.cyTarget.connectedEdges()
        edges.css({
          // 'line-color' : function(d) {
          //     return d.style('line-color') == "#D84315" ? "#AAAAAA" : "#D84315"
          //   },
            'opacity' : "1"
        })
        cy.edges().difference( edges ).css({
          'opacity' : ".2"
        })
      })
      .on('mouseout', 'node', e => {
        e.cyTarget.style({
          'border-width': function(d) {
            return (d.data("group") == "ghosts") ? 3 : 0
          },
          'font-size' : 6,
          'color' : 'gray',
          'label': function(d) {
            return d.data("name") ? d.data("name").trunc(20) : ""
          }
        })
        // e.cyTarget.connectedEdges().css({
        //   'line-color' : function() {
        //       return "#AAAAAA"
        //     }
        // })
        // reset opacity
        cy.edges().css({ 'opacity' : ".7" })
      })

    // set grab / free events
    if(this.props.ui.selectionModeOn)
      this.setUpClickEvents()
    else
      this.setUpGrabFreeEvents()

    // store cytoscape object
    this.props.updateUI('cy', cy)
    this.cy = cy
  }

  shouldComponentUpdate(nextProps) {

    let shouldUpdate = false;

    const {nodeRadius, layoutName, selectionModeOn} = nextProps.ui
    const {nodes, edges} = nextProps

    if (nextProps.width !== this.props.width) return true
    if (nextProps.height !== this.props.height) return true

    // selection mode : update events
    if( this.props.ui.selectionModeOn !== selectionModeOn) {
      selectionModeOn ?
        this.setUpClickEvents() // console.log('click mode')
      :
        this.setUpGrabFreeEvents() // console.log('grab/free mode')
    }

    // list of checks
    if( this.props.ui.layoutName !== layoutName) shouldUpdate = true
    if( this.props.ui.nodeRadius !== nodeRadius) shouldUpdate = true
    if( this.props.nodes.length !== nodes.length) shouldUpdate = true
    if( this.props.edges.length !== edges.length) shouldUpdate = true

    if( (!!nodes.length && edges.length) && !this.state.init){
      shouldUpdate = true
      this.setState({init : true})
    }

    // TODO : proper nodes/edges diff...
    return shouldUpdate
  }

  componentDidUpdate() {
    const cy = this.refs.graph.getCy().resize().fit()
  }

  render(){

    // make sure nodes & edges are there
    const {nodes, height, edges, width} = this.props
    const {layoutName, nodeRadius} = this.props.ui

    const elements = !!nodes.length && edges.length ?
      {nodes, edges}
      :
      {}

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
  nodes : React.PropTypes.array,
  nodesReady : React.PropTypes.bool,
  edges : React.PropTypes.array,
  edgesReady : React.PropTypes.bool,
  style : React.PropTypes.object,
  layoutName : React.PropTypes.string
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