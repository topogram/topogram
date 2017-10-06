import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'
import TimeLine from '/imports/client/ui/components/timeLine/TimeLine.jsx'
import PanelSelector from '/imports/client/ui/components/panelSelector/PanelSelector.jsx'

@ui()
export default class MainViz extends React.Component {


  render() {
    const {
      nodes,
      edges,
      hasGeoInfo,
      hasTimeInfo,
      focusElement,
      unFocusElement,
      onClickElement,
      selectElement,
      unselectElement,
      unselectAllElements
     } = this.props

    const {
      timeLineVisible,
      geoMapVisible,
      graphVisible
    } = this.props.ui

    const panelsCount = [geoMapVisible, graphVisible]
      .filter(d => d).length

    const height = timeLineVisible ? '80vh' : '100vh'

    let width = '100vw'
    if (panelsCount === 2) width = '50vw'
    // if (panelsCount === 3) width = '33vw'

    return (
      <div>
        <PanelSelector
          bottom={timeLineVisible ? '21vh' : '1em'}
          hasTimeInfo={ hasTimeInfo }
          hasGeoInfo={ hasGeoInfo }
        />
        {
          geoMapVisible && hasGeoInfo ?
            <GeoMap
              nodes={ nodes }
              edges={ edges }
              width={ width }
              height={ height }
              onClickElement={onClickElement}
              selectElement={selectElement}
              unselectElement={unselectElement}
              unselectAllElements={unselectAllElements}
            />
            :
            null
        }
        {
          graphVisible ?
            <Network
              nodes={ nodes }
              edges={ edges }
              width={ width }
              height={ height }
              focusElement={focusElement}
              unFocusElement={unFocusElement}
              selectElement={selectElement}
              unselectElement={unselectElement}
              unselectAllElements={unselectAllElements}
            />
            :
            null
        }
        {
          this.props.ui.timeLineVisible ?
            <TimeLine
              hasTimeInfo={hasTimeInfo}
            />
            :
            null
        }
      </div>
    )
  }
}

MainViz.propTypes = {
  nodes: PropTypes.array,
  edges: PropTypes.array,
  hasGeoInfo : PropTypes.bool,
  hasTimeInfo :  PropTypes.bool,
  focusElement : PropTypes.func.isRequired,
  unFocusElement : PropTypes.func.isRequired,
  selectElement : PropTypes.func.isRequired,
  unselectElement : PropTypes.func.isRequired,
  unselectAllElements : PropTypes.func.isRequired
}
