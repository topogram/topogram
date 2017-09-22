import React from 'react'
import cytoscape from 'cytoscape'
import ui from 'redux-ui'

import NetworkDefaultStyle from './NetworkDefaultStyle'
import {nodeMove} from '/imports/api/nodes/nodesMethods'

import Cytoscape from './Cytoscape.jsx'

const CYTOSCAPE_DIV_ID = 'network'

const style = {
}

@ui()
class Network extends React.Component {

  componentDidMount(){
    // this is a good place for events
    this.refs.graph.getCy()
      .off('free', 'node')  // reset
      .on('free', 'node', function(e) {
        var node = e.cyTarget
        nodeMove.call({ nodeId : node.id(), position : node.position()})
      })
  }


  // TODO check nodes/edges diff
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   if (
  //     nextProps.nodes.length === this.props.nodes.length
  //     &&
  //     nextProps.edges.length === this.props.edges.length
  //   )
  //   {
  //     console.log('Network unchanged, not updating cytoscapejs')
  //     return false
  //   }
  //   console.log('Network changed, updating cytoscapejs')
  //   return true
  // }

  render(){

    const {nodes, edges, ui} = this.props

    // make sure nodes & edges are there
    const elements = nodes.length && edges.length ? {nodes, edges} : {}

    return (
        <Cytoscape
          ref = "graph"
          elements ={elements}
          style = {NetworkDefaultStyle}
          layoutName = {ui.layoutName}
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
