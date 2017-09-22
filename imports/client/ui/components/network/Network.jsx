import React from 'react'
import cytoscape from 'cytoscape'
import ui from 'redux-ui'

import Cytoscape from './Cytoscape.jsx'
import NetworkDefaultStyle from './NetworkDefaultStyle'

import {nodeMove} from '/imports/api/nodes/nodesMethods'

@ui()
class Network extends React.Component {

  componentDidMount(){
    // this is a good place for events
    this.refs.graph.getCy()
      .off('free', 'node')  // reset
      .on('grab', 'node', e => {
        var node = e.cyTarget
        console.log('grabbed', node);
      })
      .on('free', 'node', function(e) {
        var node = e.cyTarget
        console.log('free', node);
        // nodeMove.call({ nodeId : node.id(), position : node.position()})
      })
  }

  render(){

    // make sure nodes & edges are there
    const {nodes, edges} = this.props
    const elements = nodes.length && edges.length ? {nodes, edges} : {}

    const {layoutName, nodeRadius} = this.props.ui

    return (
        <Cytoscape
          ref = "graph"
          elements ={elements}
          style = {NetworkDefaultStyle()}
          layoutName = {layoutName}
          nodeRadius = {nodeRadius}
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
