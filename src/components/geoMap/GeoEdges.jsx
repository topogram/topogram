import React from 'react'
import PropTypes from 'prop-types'
import { FeatureGroup, Polyline } from 'react-leaflet'


export default class GeoEdges extends React.Component {
  static propTypes = {
    edges : PropTypes.array.isRequired,
    isolateMode : PropTypes.bool,
    handleClickGeoElement : PropTypes.func.isRequired,
    onFocusElement : PropTypes.func.isRequired,
    onUnfocusElement : PropTypes.func.isRequired
  }

  render() {
    const {
      isolateMode,
      handleClickGeoElement,
      onFocusElement,
      onUnfocusElement
     } = this.props

    const edges = this.props.edges.map( (e,i) => {
      return (
        <Polyline
          key={`edge-${i}`}
          color={e.selected ? 'yellow' : e.data.color ? e.data.color : 'purple'}
          positions={e.coords}
          onClick={() => !isolateMode ?
            handleClickGeoElement({
              group : 'edge',
              el: e
            })
            :
            null
          }
          onMouseDown={() => isolateMode ?
            onFocusElement(e)
            :
            null
          }
          onMouseUp={()=> isolateMode ?
            onUnfocusElement()
            :
            null
          }
        />
      )
    }
    )

    return (
      <FeatureGroup name="GeoEdges"
        ref="edgesGroup">
        {edges}
      </FeatureGroup>
    )
  }
}
