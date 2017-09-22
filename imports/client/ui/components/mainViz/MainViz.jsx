import React from 'react'
import ui from 'redux-ui'

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

@ui()
export default class MainViz extends React.Component {

  switchGeoGraph() {
    this.props.updateUI( 'isGeoMap', !this.props.ui.isGeoMap )
  }

  render() {
    const { isGeoMap } = this.props.ui
    const { nodes, edges } = this.props

    return (
      <div>
        <div style={buttonGroupStyle}>
          <RaisedButton
            label={ isGeoMap ? "Graph" : "Geo"}
            style={buttonStyle}
            onClick={ () => this.switchGeoGraph()}
          />
        </div>
        {
          isGeoMap ?
            <GeoMap
              nodes={ nodes }
              edges={ edges }
            />
          :
            <Network
              nodes={ nodes }
              edges={ edges }
            />
        }
      </div>
    )
  }
}

MainViz.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array
}
