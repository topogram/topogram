import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'
import TimeLine from '/imports/client/ui/components/timeLine/TimeLine.jsx'
import Charts from '/imports/client/ui/components/charts/Charts.jsx'

@ui()
export default class MainViz extends React.Component {


  render() {

    const {
      topogramId,
      nodes,
      edges,
      hasGeoInfo,
      hasTimeInfo,
      hasCharts,
      onFocusElement,
      onUnfocusElement,
      onClickElement,
      selectElement,
      unselectElement,
      unselectAllElements
     } = this.props


    const {
      timeLineVisible,
      geoMapVisible,
      chartsVisible,
      graphVisible,
      fontSizeNetwork,

    } = this.props.ui

    const panelsCount = [geoMapVisible, graphVisible,chartsVisible]
      .filter(d => d).length

    //const height = timeLineVisible ? '70vh' : '100vh'
    const height = '100vh'

    let width = '100vw'
    if (panelsCount === 2) width = '50vw'

    if (panelsCount === 3) width = '33vw'

    console.log("logging",this.props.ui.chartsVisible,this.props.ui.hasCharts);
    console.log("logging",this.props)

    return (
      <div>
        {
          geoMapVisible && hasGeoInfo ?
            <GeoMap
              nodes={ nodes }
              edges={ edges }
              width={ width }
              height={ height }
              onFocusElement={onFocusElement}
              onUnfocusElement={onUnfocusElement}
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
              topogramId={ topogramId }
              nodes={ nodes }
              edges={ edges }
              width={ width }
              height={ height }
              onFocusElement={onFocusElement}
              onUnfocusElement={onUnfocusElement}
              selectElement={selectElement}
              unselectElement={unselectElement}
              unselectAllElements={unselectAllElements}
              fontSizeNetwork={fontSizeNetwork}
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
        {
          this.props.ui.chartsVisible && this.props.ui.hasCharts ?

            <Charts
              hasCharts={hasCharts}
              chartsVisible={chartsVisible}
            />
            :
            null
        }

      </div>
    )
  }
}

MainViz.propTypes = {
  topogramId: PropTypes.string.isRequired,
  nodes: PropTypes.array,
  edges: PropTypes.array,
  hasGeoInfo : PropTypes.bool,
  hasTimeInfo :  PropTypes.bool,
  hasCharts : PropTypes.bool,
  fontSizeNetwork :PropTypes.number.isRequired,
  onFocusElement : PropTypes.func.isRequired,
  onUnfocusElement : PropTypes.func.isRequired,
  selectElement : PropTypes.func.isRequired,
  unselectElement : PropTypes.func.isRequired,
  unselectAllElements : PropTypes.func.isRequired
}
