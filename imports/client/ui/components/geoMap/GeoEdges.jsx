import React from 'react'
import { FeatureGroup, Polyline } from 'react-leaflet';
import ui from 'redux-ui'

@ui()
export default class GeoEdges extends React.Component {

  onGrabEdge = (e, data, i) => {
    let selected = this.props.ui.cy
      .filter(`edge[source="${data.source}"][target="${data.target}"]`)
    this.props.updateUI('selectedElements', selected)
    this.props.updateUI( 'selectionPanelVisible', true )
  }

  onFreeEdge= () => {
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
  }

  render() {
    const edges = this.props.edges.map( (e,i) => (
      <Polyline
        key={`edge-${i}`}
        color="purple"
        positions={e.coords}
        onMouseDown={(evt) => this.onGrabEdge(evt, e.data, i)}
        onMouseUp={(evt) => this.onFreeEdge()}
      />
    ))
    return (
      <FeatureGroup name="Nodes" ref="nodesGroup">
        {edges}
      </FeatureGroup>
    )
  }
}
