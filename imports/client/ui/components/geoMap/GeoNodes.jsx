import React, { PropTypes } from 'react'
import { FeatureGroup, CircleMarker } from 'react-leaflet'

export default class GeoNodes extends React.Component {

  static propTypes = {
    nodes : PropTypes.array.isRequired,
    selectionModeOn : PropTypes.bool,
    onClickElement : PropTypes.func.isRequired,
    selectElement : PropTypes.func.isRequired,
    unselectElement : PropTypes.func.isRequired,
    unselectAllElements : PropTypes.func.isRequired
  }

  render() {
    const { selectionModeOn } = this.props
    const nodes = this.props.nodes.map((n,i) => {
      const filter = `node[i=${i}]`
      return (
        <CircleMarker
          radius={10}
          key={`node-${i}`}
          center={n.coords}
          color={n.data.selected ? 'yellow' : 'steelblue'}
          onClick={() => selectionModeOn ?
            this.props.onClickElement(n)
            :
            null
          }
          onMouseDown={() => !selectionModeOn ?
            this.props.selectElement(n)
            :
            null
          }
          onMouseUp={()=> !selectionModeOn ?
            this.props.unselectAllElements()
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
