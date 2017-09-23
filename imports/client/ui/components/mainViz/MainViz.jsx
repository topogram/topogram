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

  toggleGeo() {
    this.props.updateUI( 'geoMapVisible', !this.props.ui.geoMapVisible )
  }

  toggleGraph() {
    this.props.updateUI( 'graphVisible', !this.props.ui.graphVisible )
  }

  // toggleSelection() {
  //   this.props.updateUI( 'selectionPanelVisible', !this.props.ui.selectionPanelVisible )
  // }

  render() {

    const { geoMapVisible, graphVisible } = this.props.ui
    const { nodes, edges } = this.props

    const width = graphVisible && geoMapVisible ?
      '50vw'
        :
      '100vw'

    console.log(width);

    return (
      <div>
        <div style={buttonGroupStyle}>
          <RaisedButton
            label={ "Graph"}
            style={buttonStyle}
            onClick={ () => this.toggleGeo()}
          />
          <RaisedButton
            label={"Geo"}
            style={buttonStyle}
            onClick={ () => this.toggleGraph()}
          />
          {/* <RaisedButton
            label={"Selection"}
            style={buttonStyle}
            onClick={ () => this.toggleSelectionPanel()}
          /> */}
        </div>
        {
          geoMapVisible ?
            <GeoMap
              nodes={ nodes }
              edges={ edges }
              width={ width }
            />
          :
          null
        }
        {
          graphVisible ?
            <Network
              nodes={ nodes }
              edges={ edges }
              width={ width }
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
