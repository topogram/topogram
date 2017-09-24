import React from 'react'
import ui from 'redux-ui'
import d3 from 'd3'
import { LatLng } from 'leaflet';
import { Map, FeatureGroup, TileLayer, CircleMarker,  Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import './GeoMap.css'

import mapTiles from './mapTiles'
import GeoNodes from './GeoNodes.jsx'
import GeoEdges from './GeoEdges.jsx'

const MAP_DIV_ID = "map"
const divMapStyle = {
    position: 'fixed',
    top: '0',
    zIndex : -1
}

@ui()
class GeoMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom : 3,
      position : [51.505, -0.09]
    }
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
      .filter((n,i) =>
        selectedElements.length ? selectedNodesIndex.indexOf(i) > -1 : true
      )
      .map( (n,i) => {
        let coords = [n.data.lat,n.data.lng]
        nodesById[n.data.id] = coords; // store for edges
        let fillColor = (el && i === el.data('i')) ? 'red' : 'steelblue'
        return {...n, coords, fillColor}
      })

    let edges = this.props.edges
      .filter(e => nodesById[e.data.source] && nodesById[e.data.target])
      .map( (e,i) => {
        let coords = [nodesById[e.data.source], nodesById[e.data.target]]
        return {...e, coords}
      })

    let {url, attribution, minZoom, maxZoom, ext} = mapTiles[geoMapTile]

    return (
        <div
          id={MAP_DIV_ID}
          style={Object.assign({}, divMapStyle,{left, height})}
          >
          <Map
            center={position}
            zoom={zoom}
            ref='map'
            >
              <GeoEdges edges={edges}/>
              <GeoNodes nodes={nodes}/>
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
