import React from 'react'
import ui from 'redux-ui'
import d3 from 'd3'
import { LatLng } from 'leaflet';
import { Map, Pane, CircleMarker, TileLayer, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import './GeoMap.css'

const MAP_DIV_ID = "map"
const divMapStyle = {
    position: 'fixed',
    top: '0',
    zIndex : -1
}

import mapTiles from './mapTiles'

@ui()
class GeoMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom : 3,
      position : [51.505, -0.09]
    }
  }

  onGrabNode(e, data, i) {
    let selected = this.props.ui.cy.nodes()
      .filter(`node[i=${i}]`)
    this.props.updateUI('selectedElements', selected)
    this.props.updateUI( 'selectionPanelVisible', true )
  }
  onFreeNode() {
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
  }

  onGrabEdge(e, data, i) {
    let selected = this.props.ui.cy
      .filter(`edge[source="${data.source}"][target="${data.target}"]`)
    this.props.updateUI('selectedElements', selected)
    this.props.updateUI( 'selectionPanelVisible', true )
  }

  onFreeEdge() {
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
  }

  render() {
    let {geoMapTile, selectedElements} = this.props.ui
    let {zoom, position} = this.state
    let nodesById = {}
    let {width, height} = this.props

    // resize dynamically using d3
    d3.select('.leaflet-container')
      .style('width', width)
    const left = width === '50vw' ? '50vw' : 0;

    // selection
    let selectedNodesIndex = []
    let el = selectedElements[0];
    if(selectedElements.length === 1) {
      const subGraph = el.group() === 'nodes' ?
        el.closedNeighborhood()
        :
        el.connectedNodes().add(el)
      selectedNodesIndex = subGraph.nodes().map(n => n.data('i'))
    }

    let nodes = this.props.nodes
      .filter((n,i) => selectedElements.length ?
          selectedNodesIndex.indexOf(i) > -1
          : true
        )
      .map( (n,i) => {
        let coords = [n.data.lat,n.data.lng]
        nodesById[n.data.id] = coords; // store for edges
        let fillColor = (el && i === el.data('i')) ? 'red' : 'steelblue'
        return <CircleMarker
          radius={10}
          // style={style}
          key={`node-${i}`}
          center={coords}
          color={fillColor}
          onMouseDown={(e) => this.onGrabNode(e, n.data, i)}
          onMouseUp={(e) => this.onFreeNode()}
          />
      })

    let edges = this.props.edges
      .filter(e => nodesById[e.data.source] && nodesById[e.data.target])
      .map( (e,i) =>
        <Polyline
          key={`edge-${i}`}
          color="purple"
          positions={[ nodesById[e.data.source], nodesById[e.data.target] ]}
          onMouseDown={(evt) => this.onGrabEdge(evt, e.data, i)}
          onMouseUp={(evt) => this.onFreeEdge()}
        />
      )

    let {url, attribution, minZoom, maxZoom, ext} = mapTiles[geoMapTile]

    return (
        <div
          id={MAP_DIV_ID}
          style={Object.assign(divMapStyle,{left, height})}
          >
          <Map
            center={position}
            zoom={zoom}
            ref='map'
            >
              {edges}
              {nodes}
            <TileLayer
              url={url}
              attribution={attribution}
              minZoom={minZoom}
              maxZoom={maxZoom}
              ext={ext}
            />
          </Map>
        </div>
    )
  }
}

GeoMap.propTypes = {
  nodes : React.PropTypes.array,
  nodesReady : React.PropTypes.bool,
  edges : React.PropTypes.array,
  edgesReady : React.PropTypes.bool
}

GeoMap.defaultProps = {
  nodes : [],
  nodesReady : false,
  edges : [],
  edgesReady : false
}
export default GeoMap
