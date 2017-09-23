import React from 'react'
import ui from 'redux-ui'
import d3 from 'd3'
import { LatLng } from 'leaflet';
import { Map, Pane, CircleMarker, TileLayer, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import './GeoMap.css'

const MAP_DIV_ID = "map"
const divMapStyle = {
    height: '100vh',
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

  onClickNode() {
    console.log("click node")
  }

  onClickEdge() {
    console.log("click edge")
  }

  render() {
    let {geoMapTile} = this.props.ui
    let {zoom, position} = this.state
    let nodesById = {}
    let {width} = this.props

    // resize dynamically using d3
    d3.select('.leaflet-container')
      .style('width', width)

    const left = width === '50vw' ? '50vw' : 0;

    let nodes = this.props.nodes.map( (n,i) => {
      let coords = [n.data.lat,n.data.lng]
      nodesById[n.data.id] = coords; // store for edges
      return <CircleMarker
        radius={5}
        key={`node-${i}`}
        center={coords}
        onClick={(e) => this.onClickNode(e)}
        />
    })

    let edges = this.props.edges.map( (e,i) =>
      <Polyline
        key={`edge-${i}`}
        color="purple"
        positions={[ nodesById[e.data.source], nodesById[e.data.target] ]}
        onClick={(e) => this.onClickEdge(e)}
      />
    )

    let {url, attribution, minZoom, maxZoom, ext} = mapTiles[geoMapTile]

    return (
        <div
          id={MAP_DIV_ID}
          style={Object.assign(divMapStyle,{left})}
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
