import React from 'react'
import { FeatureGroup, Polyline } from 'react-leaflet';
import ui from 'redux-ui'

@ui()
export default class GeoEdges extends React.Component {

  render() {
    const {selectionModeOn} = this.props
    const edges = this.props.edges.map( (e,i) => {
      const filter = `edge[source="${e.data.source}"][target="${e.data.target}"]`
      return (
        <Polyline
          key={`edge-${i}`}
          color={e.selected ? 'yellow' : "purple"}
          positions={e.coords}
          onClick={() => selectionModeOn ?
            this.props.onClickGeoElement(filter)
            :
            null
          }
          onMouseDown={() => !selectionModeOn ?
            this.props.selectGeoElement(filter)
            :
            null
          }
          onMouseUp={()=> !selectionModeOn ?
            this.props.unSelectAllGeoElement()
            :
            null
          }
        />
      )
    }
  )

    return (
      <FeatureGroup name="Nodes" ref="nodesGroup">
        {edges}
      </FeatureGroup>
    )
  }
}
