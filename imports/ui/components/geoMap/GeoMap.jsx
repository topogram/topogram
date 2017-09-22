import React from 'react'

import { LatLng } from 'leaflet';
import * as d3 from 'd3';
import { geoTransform, geoMercator, geoPath } from 'd3-geo';
import { Map, Pane, CircleMarker, TileLayer, Polyline } from 'react-leaflet';


import 'leaflet/dist/leaflet.css'
import './GeoMap.css'

// import { feature } from 'topojson-client'
// import worldGeoData from './data/110m.json'
// const worldData = feature(worldGeoData, worldGeoData.objects.countries).features

const MAP_DIV_ID = "map"
const style = {
  divMap : {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex : -1
  }
}

class GeoMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom : 3,
      position : [51.505, -0.09],
      w: '100vw',
      h: '100vh'
    }
  }

  onClickNode() {
    console.log("click node")
  }

  onClickEdge() {
    console.log("click edge")
  }

  render() {
    let {zoom, position, w, h} = this.state
    let nodesById = {}

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

    return (
      <div style={style.divMap} >
        <div
          id={MAP_DIV_ID}
          style={style.divMap}
          >
          <Map
            center={position}
            zoom={zoom}
            ref='map'
            >
              {edges}
              {nodes}
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </Map>
        </div>
      </div>
    )
  }
}


//     <g className="countries">
//       {
//         worldData.map((d,i) => (
//           <path
//             key={ `path-${ i }` }
//             d={ geoPath().projection(this.projection())(d) }
//             className="country"
//             fill={ `rgba(38,50,56,${1 / worldData.length * i})` }
//             stroke="#FFFFFF"
//             strokeWidth={ 0.5 }
//           />
//         ))
//       }
//     </g>
//     <g className="geoEdges">
//       {edges}
//     </g>
//   </svg>

GeoMap.propTypes = {
  topogramId : React.PropTypes.string,
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
