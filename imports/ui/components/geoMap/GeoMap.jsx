import React from 'react'
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

import worldGeoData from './data/110m.json'

const worldData = feature(worldGeoData, worldGeoData.objects.countries).features

const MAP_DIV_ID = "map"
const style = {
  divMap : {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: '0px',
    left: '0',
    zIndex : -1
  }
}


class GeoMap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  projection() {
   return geoMercator()
     .scale(100)
     .translate([ 800 / 2, 450 / 2 ])
 }



  render() {

    const nodesById = {}
    const nodes = this.props.nodes.map( (n,i) => {
      let cx = this.projection()([n.data.lng,n.data.lat])[0],
        cy = this.projection()([n.data.lng,n.data.lat])[1]

      nodesById[n.data.id] = {...n, cx, cy}

      return (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={ 5 }
          fill="#E91E63"
          className="geoNode"
        />
      )
    })



    const edges = this.props.edges.map( (e,i) => {

      let source = nodesById[e.data.source],
          target = nodesById[e.data.target]

      let x1 = source.cx,
          y1 = source.cy,
          x2 = target.cx,
          y2 = target.cy

      return (
        <line
          key={i}
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
          stroke={'red'}
        />
      )
    })

    return (
      <div
        id={MAP_DIV_ID}
        style={style.divMap}
      >

        <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
          <g className="countries">
            {
              worldData.map((d,i) => (
                <path
                  key={ `path-${ i }` }
                  d={ geoPath().projection(this.projection())(d) }
                  className="country"
                  fill={ `rgba(38,50,56,${1 / worldData.length * i})` }
                  stroke="#FFFFFF"
                  strokeWidth={ 0.5 }
                />
              ))
            }
          </g>
          <g className="geoNodes">
            {nodes}
          </g>
          <g className="geoEdges">
            {edges}
          </g>
        </svg>
      </div>
    )
  }
}

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
