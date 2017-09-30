import React from 'react'
import ui from 'redux-ui'

import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardTitle, CardHeader } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import MenuItem from 'material-ui/MenuItem';

import QueryBox from './queryBox/QueryBox.jsx'
import NetworkOptions from './networkOptions/NetworkOptions.jsx'
import GeoMapOptions from './geoMapOptions/GeoMapOptions.jsx'

import DeleteTopogram from './settings/DeleteTopogram.jsx'
import EditTopogramTitle from './settings/EditTopogramTitle.jsx'
import TogglePublicButton from './settings/TopogramTogglePublicButton.jsx'


@ui()
class SideNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggleSelectionMode = () => {
    this.props.updateUI('selectionModeOn', !this.props.ui.selectionModeOn)
  }

  handleExpandChange = () => {
    const {open} = this.state
    this.setState({open : !open});
  }

  render() {
    const { nodes, edges } = this.props;
    const { selectionModeOn } = this.props.ui;

    return (
      <Card
        style={{ maxWidth : '30%'}}
        onExpandChange={this.handleExpandChange}
        >
        <CardTitle
          showExpandableButton={true}
          title={this.props.topogramTitle}
          titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
          subtitle={`${nodes.length} nodes, ${edges.length} edges`}
        />

        { this.state.open ?
          <span>
            {/* <QueryBox
              nodes={nodes}
              edges={edges}
            /> */}
            <GeoMapOptions/>
            <NetworkOptions/>
            <MenuItem
              primaryText="Selection Mode"
              onClick={this.handleToggleSelectionMode}
              checked={selectionModeOn}
            />

            <Subheader>Settings</Subheader>
            <TogglePublicButton
              topogramId={this.props.topogramId}
              topogramIsPublic={this.props.topogramIsPublic}
              key="ToggleTopogramPublicButton"
            />
            <EditTopogramTitle
              topogramTitle= {this.props.topogramTitle}
              topogramId={this.props.topogramId}
              key="EditTopogramTitle"
            />
            <DeleteTopogram
              topogramName= {this.props.topogramTitle}
              topogramId={this.props.topogramId}
              router={this.props.router}
              key="DeleteTopogram"
            />
          </span>
          :
          null
      }

      </Card>
    )
  }
}

export default SideNav
