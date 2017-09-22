import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'


const buttonGroupStyle = {
  bottom : 20,
  right :20,
  position : 'absolute'
};

const buttonStyle = {
  margin: 2
};

export default class MainViz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    networkVisible: false,
      mapVisible : true
    }
  }

  showMap() {
    this.setState({
      networkVisible: false,
      mapVisible : true
    })
  }

  showNetwork() {
    this.setState({
      networkVisible: true,
      mapVisible : false
    })
  }

  render() {
    const { networkVisible, mapVisible } = this.state

    return (
      <div>

        <div style={buttonGroupStyle}>
          <RaisedButton
            label="Geo"
            style={buttonStyle}
            onClick={ () => this.showMap()}
          />
          <RaisedButton
            label="Graph"
            style={buttonStyle}
            onClick={ () => this.showNetwork()}
          />
        </div>
        {
          networkVisible ?
            <Network
              nodes={ this.props.nodes }
              edges={ this.props.edges }
            />
          :
            null
        }
        {
          mapVisible ?
            <GeoMap
              nodes={ this.props.nodes }
              edges={ this.props.edges }
            />
          :
            null
        }
      </div>
    )
  }
}

MainViz.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array
}
