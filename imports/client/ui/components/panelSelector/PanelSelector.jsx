import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import './PanelSelector.css'

const buttonStyle = {
  margin: 2,
  padding: '10px 20px',
  backgroundColor: 'rgba(69,90,100 ,0.9)',
  color:'#F2EFE9 !important'
}

@ui()
export default class PanelSelector extends React.Component {

  static propTypes = {
    bottom : PropTypes.string,
    hasGeoInfo : PropTypes.bool.isRequired,
    hasTimeInfo : PropTypes.bool.isRequired,
    hasCharts :  PropTypes.bool,
  }

  toggleGeo() {
    this.props.updateUI( 'geoMapVisible', !this.props.ui.geoMapVisible )
  }

  toggleCharts() {
    this.props.updateUI( 'chartsVisible', !this.props.ui.chartsVisible,
  !this.props.hasCharts )
  }
  toggleLegend() {
    this.props.updateUI( 'legendVisible', !this.props.ui.legendVisible )
  }



  toggleGraph() {
    this.props.updateUI( 'graphVisible', !this.props.ui.graphVisible )
  }

  toggleTimeline() {
    this.props.updateUI( 'timeLineVisible', !this.props.ui.timeLineVisible )
  }

  toggleSelectionPanel() {
    this.props.updateUI( 'selectionPanelPinned', !this.props.ui.selectionPanelPinned )
  }

  render() {
    const {
      timeLineVisible,
      geoMapVisible,
      graphVisible,
      chartsVisible,
      legendVisible
    } = this.props.ui

    const {
      bottom,
      hasGeoInfo,
      hasTimeInfo,
      hasCharts,
    } = this.props

    return (
      <Menu
        desktop={true}
        style={{maxWidth:'100%',backgroundColor: 'rgba(69,90,100 ,0.9)',
        color:'#F2EFE9',}}
        >
        <MenuItem style={buttonStyle}>
          <Checkbox style={{backgroundColor: 'rgba(69,90,100 ,0.9)',
          color:'#F2EFE9',}}
            label={ 'Graph'}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={graphVisible}
            onClick={ () => this.toggleGraph()}
            style={{fill : '#D3E8E6 !important' }}
          />
        </MenuItem>
        <MenuItem style={buttonStyle}>
          <Checkbox
            label={'Geo'}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={geoMapVisible}
            disabled={!hasGeoInfo}
            onClick={ () => this.toggleGeo()}
          />
        </MenuItem>
        <MenuItem style={buttonStyle}>
          <Checkbox
            label={'Time'}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={timeLineVisible}
            disabled={!hasTimeInfo}
            onClick={ () => this.toggleTimeline()}
          />
        </MenuItem>
        <MenuItem style={buttonStyle}>
          <Checkbox
            label={'Charts'}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={chartsVisible}
            //disabled={!chartsVisible}
            onClick={ () => this.toggleCharts()}
          />
        </MenuItem>
        <MenuItem style={buttonStyle}>
          <Checkbox
            label={'Legend'}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={legendVisible}
            //disabled={!legendVisible}
            onClick={ () => this.toggleLegend()}
          />
        </MenuItem>
        {/* <MenuItem style={buttonStyle}>
          <Checkbox
            label={"Selection"}
            labelStyle={{backgroundColor: 'rgba(69,90,100 ,0.9)',
            color:'#F2EFE9',}}
            checked={selectionPanelPinned}
            onClick={ () => this.toggleSelectionPanel()}
          />
        </MenuItem> */}
      </Menu>
    )
  }
}
