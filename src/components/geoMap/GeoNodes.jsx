import React from 'react'
import PropTypes from 'prop-types'
import { FeatureGroup, CircleMarker } from 'react-leaflet'

export default class GeoNodes extends React.Component {

  static propTypes = {
    nodes : PropTypes.array.isRequired,
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

    const nodes = this.props.nodes.map((n,i) => {
      return (
        <CircleMarker
          radius={n.data.weight? n.data.weight: 10}
          key={`node-${i}`}
          center={n.coords}
          color={n.data.selected ? 'yellow' : n.data.color ? n.data.color : 'steelblue'}
          onClick={() => !isolateMode ?
            handleClickGeoElement({
              group : 'node',
              el: n
            })
            :
            null
          }
          onMouseDown={() => isolateMode ?
            onFocusElement(n)
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
    })

    return (
      <FeatureGroup name="Nodes"
        ref="nodesGroup">
        {nodes}
      </FeatureGroup>
    )
  }
}
