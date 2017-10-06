import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Network from '/imports/client/ui/components/network/Network.jsx'
import GeoMap from '/imports/client/ui/components/geoMap/GeoMap.jsx'
import TimeLine from '/imports/client/ui/components/timeLine/TimeLine.jsx'
import PanelSelector from '/imports/client/ui/components/panelSelector/PanelSelector.jsx'

@ui()
export default class MainViz extends React.Component {

  onClickElement = (el) => {
    // if already selected, then unselect
    const { selectedElements } = this.props.ui
    if (selectedElements.map(d=>d.id()).includes(el.id())) {this.unselectElement(el)}
    else {this.selectElement(el)}
  }

  unselectElement = (el) => {
    el.data('selected', false)
    const selectedElements = this.props.ui.selectedElements
      .filter(n => n.data('id') !== el.data('id'))
    this.props.updateUI('selectedElements', selectedElements)
  }

  selectElement = (el) => {
    el.data('selected', true)
    this.props.updateUI(
      'selectedElements',
      [...this.props.ui.selectedElements, el]
    )
    this.props.updateUI( 'selectionPanelVisible', true )
  }

  unselectAllElements = () => {
    this.props.ui.selectedElements.forEach(el=>el.data('selected', false))
    this.props.updateUI('selectedElements', [])
    this.props.updateUI( 'selectionPanelVisible', false )
  }

  render() {
    const { topogramId, nodes, edges, hasGeoInfo, hasTimeInfo } = this.props

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
              onClickElement={this.onClickElement}
              selectElement={this.selectElement}
              unselectElement={this.unselectElement}
              unselectAllElements={this.unselectAllElements}
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
              onClickElement={this.onClickElement}
              selectElement={this.selectElement}
              unselectElement={this.unselectElement}
              unselectAllElements={this.unselectAllElements}
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
  topogramId: PropTypes.string.isRequired,
  nodes: PropTypes.array,
  edges: PropTypes.array,
  hasGeoInfo : PropTypes.bool,
  hasTimeInfo :  PropTypes.bool
}
