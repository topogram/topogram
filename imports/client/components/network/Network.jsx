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
  }
}

class Network extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      elements : {
        nodes : this.props.elements.nodes,
        edges : this.props.elements.edges
      },
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
        elements: this.state.elements,
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

  }

  componentDidMount() {
    this.createNetwork()
  }

  componentDidUpdate() {
    this.updateNetwork()
  }

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
  elements : React.PropTypes.object,
  style : React.PropTypes.object,
  layoutName : React.PropTypes.string
}

Network.defaultProps = {
  elements : { nodes : [], edges : [] },
  style : NetworkDefaultStyle(),
  layoutName : 'preset'
}
export default Network
