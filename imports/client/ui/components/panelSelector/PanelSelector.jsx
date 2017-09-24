import React from 'react'
import ui from 'redux-ui'

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

const buttonGroupStyle = {
  left :20,
  position : 'absolute',
  display: 'flex',
  flexDirection: 'row'
};

const buttonStyle = {
  margin: 2,
  padding: '10px 20px'
};

@ui()
export default class PanelSelector extends React.Component {

  toggleGeo() {
    this.props.updateUI( 'geoMapVisible', !this.props.ui.geoMapVisible )
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
      selectionPanelPinned,
      geoMapVisible,
      graphVisible
    } = this.props.ui

    const { bottom } = this.props

    return (
      <div style={Object.assign(buttonGroupStyle, {bottom})}>
        <Paper style={buttonStyle}>
          <Checkbox
            label={ "Graph"}
            checked={graphVisible}
            onClick={ () => this.toggleGraph()}
          />
        </Paper>
        <Paper style={buttonStyle}>
          <Checkbox
            label={"Geo"}
            checked={geoMapVisible}
            onClick={ () => this.toggleGeo()}
          />
        </Paper>
        <Paper style={buttonStyle}>
          <Checkbox
            label={"Time"}
            checked={timeLineVisible}
            onClick={ () => this.toggleTimeline()}
          />
        </Paper>
        {/* <Paper style={buttonStyle}>
          <Checkbox
            label={"Selection"}
            checked={selectionPanelPinned}
            onClick={ () => this.toggleSelectionPanel()}
          />
        </Paper> */}
      </div>
    )
  }
}
