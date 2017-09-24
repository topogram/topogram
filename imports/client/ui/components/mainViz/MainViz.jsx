import React from 'react'
import ui from 'redux-ui'

import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'
import TimeLine from '/imports/client/ui/components/timeLine/TimeLine.jsx'
import PanelSelector from '/imports/client/ui/components/panelSelector/PanelSelector.jsx'

@ui()
export default class MainViz extends React.Component {

  render() {
    const { nodes, edges } = this.props

    const {
      timeLineVisible,
      selectionPanelPinned,
      geoMapVisible,
      graphVisible
    } = this.props.ui

    let panelsCount = [geoMapVisible, graphVisible]
      .filter(d => d).length

    let width = '100vw'
    let height = '80vh'
    if (panelsCount === 2) width = '50vw'
    // if (panelsCount === 3) width = '33vw'

    return (
      <div>
        <PanelSelector
          bottom={timeLineVisible ? '21vh' : '1em'}
        />
        {
          geoMapVisible ?
            <GeoMap
              nodes={ nodes }
              edges={ edges }
              width={ width }
              height={ height }
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
            />
          :
           null
        }
        {
          this.props.ui.timeLineVisible ?
          <TimeLine
            hasTimeInfo={this.props.hasTimeInfo}
          />
          :
          null
        }
      </div>
    )
  }
}

MainViz.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array
}
