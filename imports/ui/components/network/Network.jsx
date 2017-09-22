import React from 'react'
import cytoscape from 'cytoscape'

import NetworkDefaultStyle from './NetworkDefaultStyle'
import {nodeMove} from '/imports/api/nodes/nodesMethods'

const CYTOSCAPE_DIV_ID = 'network'

const style = {
  divNetwork : {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: '0px',
    left: '0',
    zIndex : -1
  }
}

class Network extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      layoutName : this.props.layoutName,
      style: this.props.style,
      network : null // cytoscape instance
    }
    this.createNetwork = this.createNetwork.bind(this)
    this.updateNetwork = this.updateNetwork.bind(this)

  }

  createNetwork() {
    console.log('* Cytoscape init...')
    const network = cytoscape(
      {
        container: document.getElementById(CYTOSCAPE_DIV_ID),
        elements: { nodes: this.props.nodes, edges : this.props.edges },
        style: this.props.style,
        layout: {
          name: this.state.layoutName
        }
      }
    )

    // drag node
    network.off('free', 'node')  // reset
    network.on('free', 'node', function(e) {
       var node = e.cyTarget
       nodeMove.call({ nodeId : node.id(), position : node.position()})
    })


    this.setState({ network })
  }

  updateNetwork() {
    // TODO : check for missing nodes in edges
    this.state.network.json({
      elements : { nodes : this.props.nodes, edges : this.props.edges }
    })
  }

  componentDidMount() {
    this.createNetwork()
  }

  componentDidUpdate() {
    this.updateNetwork()
  }

  // TODO check nodes/edges diff
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.networkData.equals(this.props.networkData)) {
  //     console.log('Network unchanged, not updating cytoscapejs')
  //     return false
  //   }
  //   console.log('Network changed, updating cytoscapejs')
  //   return true
  // }

  render() {
    return (
      <div
        id={CYTOSCAPE_DIV_ID}
        style={style.divNetwork}
      >
      </div>
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
