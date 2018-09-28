import React, { PropTypes } from 'react'
import { FeatureGroup, Polyline } from 'react-leaflet'
import ui from 'redux-ui'

@ui()
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
          //LIMIT THE EDGES MAX WIDTH
          weight={e.data.weight?e.data.weight > 6 ? 40 : Math.pow(e.data.weight,2):1}
          dashArray= {e.data.group?
             (
               e.data.group.includes("DASHED2")?"5,2":
               e.data.group.includes("DASHED1")?"5,4":
               e.data.group.includes("DASHED-2")?"5,2,2,5,2,2,5":
               e.data.group.includes("DASHED-1")? "1,5,1,5,1":
               ""
             )
             :""
           }
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
