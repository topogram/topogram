import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import d3 from 'd3'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import './GeoMap.css'

import mapTiles from './mapTiles'
import GeoNodes from './GeoNodes.jsx'
import GeoEdges from './GeoEdges.jsx'

const MAP_DIV_ID = 'map'
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

  static propTypes = {
    onClickElement : PropTypes.func.isRequired,
    selectElement : PropTypes.func.isRequired,
    unselectElement : PropTypes.func.isRequired,
    unselectAllElements : PropTypes.func.isRequired,
    width : PropTypes.string.isRequired,
    height : PropTypes.string.isRequired
  }

  onClickGeoElement = (filter) => {
    const { cy } = this.props.ui
    const selected = cy.filter(filter)
    this.props.onClickElement(selected)
  }

  selectGeoElement = (filter) => {
    const { cy } = this.props.ui
    const selected = cy.filter(filter)
    this.props.selectElement(selected)
  }

  unselectGeoElement = (filter) => {
    const { cy } = this.props.ui
    const selected = cy.filter(filter)
    this.props.unselectElement(selected)
  }

  render() {
    const { geoMapTile, selectionModeOn } = this.props.ui
    const { zoom, position } = this.state
    const nodesById = {}
    const { width, height } = this.props

    // resize dynamically using d3
    d3.select('.leaflet-container')
      .style('width', width)
    const left = width === '50vw' ? '50vw' : 0

    const nodes = this.props.nodes
      .map( n => {
        const coords = [n.data.lat,n.data.lng]
        const node = { ...n, coords }
        nodesById[n.data.id] = node // store for edges
        return node
      })

    const edges = this.props.edges
      .map( e => {
        const source = nodesById[e.data.source],
          target = nodesById[e.data.target],
          coords = [source.coords, target.coords],
          selected = e.data.selected
        return { ...e, source, target, coords, selected }
      })

    // console.log(nodes);
    // console.log(edges);

    const { url, attribution, minZoom, maxZoom, ext } = mapTiles[geoMapTile]

    return (
      <div
        id={MAP_DIV_ID}
        style={Object.assign({}, divMapStyle,{ left, height })}
      >
        <Map
          center={position}
          zoom={zoom}
          ref="map"
        >
          {
            edges.length ?
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
            nodes.length ?
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
