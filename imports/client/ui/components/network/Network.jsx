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

  componentDidMount(){
    // this is a good place for events
    this.refs.graph.getCy()
      .off('free', 'node')  // reset
      .on('grab', 'node', e => {
        var node = e.cyTarget
        console.log(node);
        this.props.updateUI('selectedElements', [node])
      })
      .on('free', 'node', e => {
        var node = e.cyTarget
        console.log('grabbed', node);
        this.props.updateUI('selectedElements', [])
      })
  }

  shouldComponentUpdate(nextProps) {

    let shouldUpdate = false;

    const {nodeRadius, layoutName} = nextProps.ui
    const {nodes, edges} = nextProps

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

  render(){

    // make sure nodes & edges are there
    const {nodes, edges} = this.props
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
