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

  onClickGeoElement = (filter) => {
    const {cy, selectedElements} = this.props.ui
    const selected = cy.filter(filter)
    this.props.onClickElement(selected)
  }

  selectGeoElement = (filter) => {
    const {cy, selectedElements} = this.props.ui
    const selected = cy.filter(filter)
    this.props.selectElement(selected)
  }

  unselectGeoElement = (filter) => {
    const {cy, selectedElements} = this.props.ui
    const selected = cy.filter(filter)
    this.props.unselectElement(selected)
  }

  render() {
    let {geoMapTile, selectedElements, selectionModeOn} = this.props.ui
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
      .map( (n,i) => {
        let coords = [n.data.lat,n.data.lng]
        let node = {...n, coords}
        nodesById[n.data.id] = node; // store for edges
        return node
      })

    let edges = this.props.edges
      .map( (e,i) => {
        let source = nodesById[e.data.source],
          target = nodesById[e.data.target],
          coords = [source.coords, target.coords],
          selected = e.data.selected
        return {...e, source, target, coords, selected}
      })

    // console.log(nodes);
    // console.log(edges);

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
              {
                !!edges.length ?
                <GeoEdges
                  edges={edges}
                  selectionModeOn={selectionModeOn}
                  onClickGeoElement={this.onClickGeoElement}
                  selectGeoElement={this.selectGeoElement}
                  unselectGeoElement={this.unselectGeoElement}
                  unselectAllElements={this.props.unselectAllElements}
                />
                :
                null
              }
              {
                !!nodes.length ?
                <GeoNodes
                  nodes={nodes}
                  selectionModeOn={selectionModeOn}
                  onClickGeoElement={this.onClickGeoElement}
                  selectGeoElement={this.selectGeoElement}
                  unselectGeoElement={this.unselectGeoElement}
                  unselectAllElements={this.props.unselectAllElements}
                />
                :
                null
              }
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
