import React from 'react'
import ui from 'redux-ui'


import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
// import RaisedButton from 'material-ui/RaisedButton';

import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'


const buttonGroupStyle = {
  bottom : 20,
  left :20,
  position : 'absolute',
  display: 'flex', flexDirection: 'row'
};

const buttonStyle = {
  margin: 2,
  padding: '10px 20px'
};

@ui()
export default class MainViz extends React.Component {

  toggleGeo() {
    this.props.updateUI( 'geoMapVisible', !this.props.ui.geoMapVisible )
  }

  toggleGraph() {
    this.props.updateUI( 'graphVisible', !this.props.ui.graphVisible )
  }

  toggleSelectionPanel() {
    this.props.updateUI( 'selectionPanelPinned', !this.props.ui.selectionPanelPinned )
  }

  render() {

    const { selectionPanelPinned, geoMapVisible, graphVisible } = this.props.ui
    const { nodes, edges } = this.props

    let panelsCount = [geoMapVisible, graphVisible].filter(d => d).length

    let width = '100vw'
    if (panelsCount === 2) width = '50vw'
    // if (panelsCount === 3) width = '33vw'

    return (
      <div>
        <div style={buttonGroupStyle}>
          <Paper style={buttonStyle}>
            <Checkbox
              label={"Geo"}
              checked={geoMapVisible}
              onClick={ () => this.toggleGeo()}
            />
          </Paper>
          <Paper style={buttonStyle}>
            <Checkbox
              label={ "Graph"}
              checked={graphVisible}
              onClick={ () => this.toggleGraph()}
            />
          </Paper>
          <Paper style={buttonStyle}>
            <Checkbox
              label={"Selection"}
              checked={selectionPanelPinned}
              onClick={ () => this.toggleSelectionPanel()}
            />
          </Paper>
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
