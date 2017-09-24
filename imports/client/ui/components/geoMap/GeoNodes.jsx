import React from 'react'
import { FeatureGroup, CircleMarker } from 'react-leaflet';
import ui from 'redux-ui'

@ui()
export default class GeoNodes extends React.Component {

  onGrabNode = (e, data, i) => {
    let selected = this.props.ui.cy.nodes()
      .filter(`node[i=${i}]`)
    this.props.updateUI('selectedElements', selected)
    this.props.updateUI( 'selectionPanelVisible', true )
  }

  onFreeNode = () => {
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
  }

  render() {

    let nodes = this.props.nodes.map((n,i) =>(
      <CircleMarker
        radius={10}
        key={`node-${i}`}
        center={n.coords}
        color={n.fillColor}
        onMouseDown={(e) => this.onGrabNode(e, n.data, i)}
        onMouseUp={(e) => this.onFreeNode()}
        />
    ))

    return (
      <FeatureGroup name="Nodes" ref="nodesGroup">
        {nodes}
      </FeatureGroup>
    )
  }
}
