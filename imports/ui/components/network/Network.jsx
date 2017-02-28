import React from 'react'
import cytoscape from 'cytoscape'

import NetworkDefaultStyle from './NetworkDefaultStyle'


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
    this.setState({ network })
  }

  updateNetwork() {
    console.log('* rendering network...')
    console.log(this.state.network, this.props.nodes);
    this.state.network.json( { elements : { nodes : this.props.nodes, edges : this.props.edges } } );
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
  topogramId : React.PropTypes.string,
  nodes : React.PropTypes.array,
  edges : React.PropTypes.array,
  style : React.PropTypes.object,
  layoutName : React.PropTypes.string
}

Network.defaultProps = {
  nodes : [],
  edges : [],
  style : NetworkDefaultStyle(),
  layoutName : 'preset'
}
export default Network
